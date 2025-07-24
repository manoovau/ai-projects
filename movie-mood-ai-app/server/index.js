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
  const { title, year } = req.body;

  console.log("🎬 Searching TMDb for:", title, year);

  const SEARCH_URL = "https://api.themoviedb.org/3/search/movie";

  try {
    const response = await axios.get(SEARCH_URL, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: title,
        year,
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

app.post("/api/embedding-search", async (req, res) => {
  const { favoriteMovie, moodType, tonePreference } = req.body;

  const input = `
    My favorite movie is: ${favoriteMovie}.
    I'm in the mood for something: ${moodType}.
    I want something that feels: ${tonePreference}.
  `;

  try {
    // Create embedding
    const embeddingResponse = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input,
    });

    const embedding = embeddingResponse.data[0].embedding;

    console.log("Embedding for manual testing:", JSON.stringify(embedding));

    // Call supabase RPC
    const { data, error } = await supabase.rpc("match_movies", {
      query_embedding: embedding,
      match_threshold: 0.5,
      match_count: 5,
    });

    if (error) throw error;

    const results = data.map((item) => {
      const text =
        typeof item.content === "string"
          ? item.content
          : item.content?.pageContent || "Unknown content";

      return {
        title: text.split(":")[0] || "Unknown",
        year: "N/A",
        description: text,
      };
    });

    console.log("Backend embedding results:", results);
    res.json({ results });
  } catch (error) {
    console.error("Embedding Search Error:", error);
    res.status(500).json({ error: "Failed to process embedding search" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
