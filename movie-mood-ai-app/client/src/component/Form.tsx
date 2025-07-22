import { useState } from "react";
import { supabase } from "../supabase-client";
import { type Movie } from "./Result";

// import { openai } from "../openai-client";

interface MovieEmbedding {
  id: number;
  content: {
    pageContent: string;
  };
  embedding: number[];
}

interface FormProps {
  onSubmitComplete: (movies: Movie[]) => void;
}

// Get movie
export const fetchMovie = async (
  MovieID: number
): Promise<MovieEmbedding[]> => {
  const { error, data } = await supabase
    .from("movies")
    .select("*, content")
    .eq("id", MovieID);

  if (error) throw new Error(error.message);

  console.log("data");
  console.log(data);

  return data as MovieEmbedding[];
};

await fetchMovie(1);

/*
// User query about podcasts
const query = "Something peaceful and relaxing";
main(query);

// Bring all function calls together
async function main(input: string) {
  const embedding = await createEmbedding(input);
  // const match = await findNearestMatch(embedding);
  // await getChatCompletion(match, input);
  console.log("embedding: " + embedding);
}




// Create an embedding vector representing the input text
async function createEmbedding(input: string) {
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input,
  });
  console.log(
    "embeddingResponse.data[0].embedding " + embeddingResponse.data[0].embedding
  );

  return embeddingResponse.data[0].embedding;
}
*/

// import podcasts from './content.js';

// async function main(input) {
// const data = await Promise.all(
//     input.map( async (textChunk) => {
//         const embeddingResponse = await openai.embeddings.create({
//             model: "text-embedding-ada-002",
//             input: textChunk
//         });
//         return {
//         content: textChunk,
//         embedding: embeddingResponse.data[0].embedding
//         }
//     })
// );

// // Insert content and embedding into Supabase
// await supabase.from('documents').insert(data);
// console.log('Embedding and storing complete!');
// }

// main(podcasts)

export const Form = ({ onSubmitComplete }: FormProps) => {
  const [formData, setFormData] = useState({
    favoriteMovie: "",
    moodType: "",
    tonePreference: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const extractArrayFromText = (text: string) => {
    const arrayMatch = text.match(/\[\s*{[\s\S]*?}\s*\]/);

    console.log("arrayMatch");

    console.log(arrayMatch);
    if (!arrayMatch) {
      throw new Error("No array found in the input text");
    }
    let arrayText = arrayMatch[0];

    arrayText = arrayText.replace(/([{,]\s*)(\w+)\s*:/g, '$1"$2":');

    console.log("arrayText");

    console.log(arrayText);
    try {
      console.log("return extractArrayFromText");
      console.log(JSON.parse(arrayText));
      return JSON.parse(arrayText);
    } catch (err) {
      console.error("Failed to parse JSON array:", err);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const prompt = `
    My favorite movie is: ${formData.favoriteMovie}.
    I'm in the mood for something: ${formData.moodType}.
    I want something that feels: ${formData.tonePreference}.
    Please, return the results in a array. Each entry should be a object with the keys title, year and description.
    e.g:
   [{title: "Jumanji: Welcome to the Jungle", year: 2008, description: "This is a fun, adventurous movie with lots of humor."},{title: "Pirates of the Caribbean", year: 2000, description: "Series - You'll enjoy these fun, adventurous movies featuring Johnny Depp as the eccentric Captain Jack Sparrow."}]. 
  
   `;

    try {
      const response = await fetch("http://localhost:3001/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      console.log("GPT Response:", data.result);
      const tempResponse = `[
            {title: "The Grand Budapest Hotel", year: 2014, description: "The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend."},
            {title: "Baby Driver", year: 2017, description: "After being coerced into working for a crime boss, a young getaway driver finds himself taking part in a heist doomed to fail."},
            {title: "The Secret Life of Walter Mitty", year: 2013, description: "When his job along with that of his coworker are threatened, Walter takes action in the real world embarking on a global journey that turns into an adventure more extraordinary than anything he could have ever imagined."},
            {title: "Guardians of the Galaxy", year: 2014, description: "A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe."},
            {title: "La La Land", year: 2016, description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future."}
            ]`;

      const movieArray = extractArrayFromText(tempResponse);

      // Remove this when you need to use Chatgpt
      // const movieArray = extractArrayFromText(data.result);

      onSubmitComplete(movieArray);
    } catch (error) {
      console.error("Error calling GPT backend:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-darkBlue text-white p-6 rounded-xl max-w-lg mx-auto space-y-6 shadow-lg"
    >
      <div>
        <label htmlFor="favoriteMovie" className="block font-semibold mb-1">
          &nbsp;What&apos;s your favorite movie and why?
        </label>
        <textarea
          id="favoriteMovie"
          name="favoriteMovie"
          value={formData.favoriteMovie}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Tell us about your favorite movie..."
          required
        />
      </div>

      <div>
        <label htmlFor="moodType" className="block font-semibold mb-1">
          Are you in the mood for something new or classic?
        </label>
        <input
          type="text"
          id="moodType"
          name="moodType"
          value={formData.moodType}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New or classic?"
          required
        />
      </div>

      <div>
        <label htmlFor="tonePreference" className="block font-semibold mb-1">
          Do you wanna have fun or do you want something serious?
        </label>
        <input
          type="text"
          id="tonePreference"
          name="tonePreference"
          value={formData.tonePreference}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Fun or serious?"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`${
          loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
        } px-4 py-2 rounded-md font-semibold transition`}
      >
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};
