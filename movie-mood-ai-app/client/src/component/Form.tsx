import { useState } from "react";
import { supabase } from "../supabase-client";
// import { openai } from "../openai-client";

interface MovieEmbedding {
  id: number;
  content: {
    pageContent: string;
  };
  embedding: number[];
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

export const Form = () => {
  const [formData, setFormData] = useState({
    favoriteMovie: "",
    moodType: "",
    tonePreference: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const prompt = `
    My favorite movie is: ${formData.favoriteMovie}.
    I'm in the mood for something: ${formData.moodType}.
    I want something that feels: ${formData.tonePreference}.
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
      console.log("💡 GPT Response:", data.result);
      alert(data.result); // Or display it nicely in the UI
    } catch (error) {
      console.error("Error calling GPT backend:", error);
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
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md font-semibold transition"
      >
        Submit
      </button>
    </form>
  );
};
