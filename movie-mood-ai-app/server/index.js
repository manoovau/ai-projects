// index.js (CommonJS version)
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");
const axios = require("axios");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/imdb-poster", async (req, res) => {
  const { title, releaseYear } = req.body;

  console.log("🎬 Searching TMDb for:", title, releaseYear);

  const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

  try {
    const response = await axios.get(SEARCH_URL, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: title,
        releaseYear,
      },
    });

    console.log("📦 TMDb search response:", response.data);

    const movie = response.data.results?.[0];
    const posterPath = movie?.poster_path;

    if (posterPath) {
      const fullPosterUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;
      res.json({ posterUrl: fullPosterUrl });
    } else {
      res.status(404).json({ error: "Poster not found" });
      res.json({
        posterUrl: "https://via.placeholder.com/300x450?text=No+Poster",
      });
    }
  } catch (error) {
    console.error("TMDb Poster Fetch Error:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    res.status(500).json({ error: "Failed to fetch poster" });
  }
});

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Chat GPT
app.post("/api/ask", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.chat.completions.create({
      // model: "gpt-4",
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful movie recommendation assistant.",
        },
        { role: "user", content: prompt },
      ],
    });

    const resp = res.json({ result: response.choices[0].message.content });

    console.log("resp backed");
    console.log(resp);
  } catch (error) {
    console.error("OpenAI Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function extractDurationInMinutes(text) {
  const lower = text.toLowerCase();

  // Match "1 hr 50 min", "1 hour 50 minutes", "1hr 50min"
  const hrMinMatch = lower.match(
    /(\d+)\s*(h|hr|hour|hours)[^\d]*(\d+)?\s*(m|min|minute|minutes)?/
  );
  if (hrMinMatch) {
    const hours = parseInt(hrMinMatch[1], 10);
    const minutes = hrMinMatch[3] ? parseInt(hrMinMatch[3], 10) : 0;
    return hours * 60 + minutes;
  }

  // Match "110 min", "110min", "90"
  const minOnlyMatch = lower.match(/(\d+)\s*(m|min|minute|minutes)?/);
  if (minOnlyMatch) {
    return parseInt(minOnlyMatch[1], 10);
  }
  //
  return null;
}

// embedding inputs
app.post("/api/embedding-search", async (req, res) => {
  const { formData, grouplimits, minutes } = req.body;
  const { favoriteMovie, moodType, tonePreference } = formData;
  const { time } = grouplimits;

  const input = `
    My favorite movie is: ${favoriteMovie}.
    I'm in the mood for something: ${moodType}.
    I want something that feels: ${tonePreference}.
    ${
      time !== ""
        ? `I want a movie that fits within ${time} (approximately ${minutes} minutes).`
        : ""
    }
  `;

  try {
    // Create embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input,
    });

    const embedding = embeddingResponse.data[0].embedding;

    console.log("Embedding for manual testing:", JSON.stringify(embedding));
    const MATCH_COUNT = time !== "" ? 10 : 5;
    // Call supabase RPC
    const { data, error } = await supabase.rpc("match_movie_mood", {
      query_embedding: embedding,
      // Set similarity score [0 -1 ]: 0 = completely unrelated, 1 = perfect match
      match_threshold: 0.75,
      match_count: 5,
    });

    if (error) throw error;

    const results = data.map((item) => {
      const text =
        typeof item.content === "string"
          ? item.content
          : item.content?.title || "Unknown content";

      return {
        title:
          text.split(`{"title":"`)[1].split(`","releaseYear":"`)[0] ||
          "Unknown",
        releaseYear:
          text.split(`"releaseYear":"`)[1].split(`","content":"`)[0] ||
          "Unknown",
        content: text.split(`"content":"`)[1].split(`"}`)[0] || "Unknown",
      };
    });

    console.log("Backend embedding results:", results);

    if (time !== "") {
      const filteredResults = results.filter((movie) => {
        const duration = extractDurationInMinutes(movie.content);
        console.log("duration");
        console.log(duration);
        if (duration !== null) {
          return duration <= minutes;
        }

        // No duration found
        return [{ title: "Movie not Found", releaseYear: "", content: "" }];
      });

      console.log("filteredResults");
      console.log(filteredResults);

      return res.json({ results: filteredResults });
    } else {
      console.log("results no time");
      console.log(results);
      return res.json({ results });
    }
  } catch (error) {
    console.error("Embedding Search Error:", error);
    res.status(500).json({ error: "Failed to process embedding search" });
  }
});

const { z } = require("zod");

// Schema for a single movie entry
const movieSchema = z.object({
  title: z.string().min(1),
  releaseYear: z.string().min(1),
  content: z.string().min(1),
});

// Add json file in supabase table
app.post("/api/seed-movies", async (req, res) => {
  const movies = req.body;

  // Validate movies array from body
  if (!Array.isArray(movies)) {
    return res.status(400).json({
      error: "Request body must be an array of movie objects.",
    });
  }

  // Validate each movie entry using Zod
  const validMovies = [];
  const invalidMovies = [];

  movies.map((movie) => {
    //Check if the given input (movie) matches the schema (movieSchema).
    const result = movieSchema.safeParse(movie);
    if (result.success) {
      validMovies.push(result.data); // parsed & safe
    } else {
      invalidMovies.push(movie);
    }
  });

  if (invalidMovies.length > 0) {
    console.warn("❌ Invalid movie entries received:", invalidMovies);
    return res.status(400).json({
      message: "Invalid format. Please use the correct movie format.",
      error: `Invalid movie entries: `,
      invalidMovies: invalidMovies,
      invalidCount: invalidMovies.length,
    });
  }

  // If no valid movies
  if (validMovies.length === 0) {
    return res.status(400).json({
      error: "No valid movie entries found in the request.",
      invalidMovies,
    });
  }

  try {
    // Fetch existing entries from Supabase
    const { data: existingMovies, error: fetchError } = await supabase
      .from("movie_mood")
      .select("content");

    if (fetchError) {
      console.error("❌ Supabase fetch error:", fetchError);
      return res.status(500).json({ error: "Failed to fetch existing movies" });
    }

    //Parse existing content to JS objects
    const parsedExisting = existingMovies
      .map((movie) => {
        try {
          // turn JSON string into object
          return JSON.parse(movie.content);
        } catch (e) {
          // if it's corrupted or bad JSON
          return null;
        }
      })
      // remove nulls
      .filter(Boolean);

    // Create Set of unique keys: "title-releaseYear"
    const existingSet = new Set(
      parsedExisting.map(
        (m) => `${m.title.toLowerCase().trim()}-${m.releaseYear.trim()}`
      )
    );

    // Filter new entries
    const newMovies = movies.filter((movie) => {
      const key = `${movie.title
        .toLowerCase()
        .trim()}-${movie.releaseYear.trim()}`;
      const isDuplicate = existingSet.has(key);
      if (isDuplicate) {
        console.log(
          `⚠️ Duplicate movie skipped: ${movie.title} (${movie.releaseYear})`
        );
      }
      return !isDuplicate;
    });

    if (newMovies.length === 0) {
      return res.status(200).json({
        message: "These movies already exist in the database.",
        inserted: 0,
        duplicates: movies.length,
      });
    }

    // Prepare stringified and original entries
    const formattedMovies = newMovies.map((movie) => ({
      stringified: JSON.stringify({
        title: movie.title,
        releaseYear: movie.releaseYear,
        content: movie.content,
      }),
      // keep original data for reference
      original: movie,
    }));

    const inputs = formattedMovies.map((m) => m.stringified);
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: inputs,
    });

    const embeds = embeddingResponse.data.map((d) => d.embedding);

    // Insert validated entries into Supabase
    const inserts = formattedMovies.map((movie, i) => ({
      content: movie.stringified,
      embedding: embeds[i],
    }));

    const { data: insertData, error: insertError } = await supabase
      .from("movie_mood")
      .insert(inserts);

    if (insertError) {
      console.error("❌ Supabase insert error:", insertError);
      return res.status(500).json({ error: "Failed to insert new movies" });
    }

    return res.status(200).json({
      message: `✅ ${inserts.length} new movie(s) inserted`,
      inserted: inserts.length,
      duplicates: validMovies.length - inserts.length,
    });
  } catch (error) {
    console.error("❌ Server error during movie seeding:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ error: "Server error during movie seeding" });
  }
});

app.post("/api/login", (req, res) => {
  const { username, pw } = req.body;

  const isAuth =
    username === process.env.ADMIN_USERNAME &&
    pw === process.env.ADMIN_PASSWORD;

  if (isAuth) {
    return res.status(200).json({ success: true });
  }

  res.status(401).json({ success: false, message: "Invalid credentials" });
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
