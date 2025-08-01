import { useState } from "react";
import { type Movie } from "./Result";
import mockResults from "../data/mock_embedding_result"; // adjust the path if needed

interface FormProps {
  onSubmitComplete: (movies: Movie[]) => void;
}

type ActiveBtnType = "GPT" | "DATABASE" | "MOCK";

export const Form = ({ onSubmitComplete }: FormProps) => {
  const [formData, setFormData] = useState({
    favoriteMovie: "",
    moodType: "",
    tonePreference: "",
  });
  const RESULT_NUM = 5;

  const [loading, setLoading] = useState(false);
  const [activeBtn, setActieBtn] = useState<ActiveBtnType | null>(null);

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

  // Send prompt to GPT backend
  const handleAskGPT = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setActieBtn("GPT");

    const prompt = `
    My favorite movie is: ${formData.favoriteMovie}.
    I'm in the mood for something: ${formData.moodType}.
    I want something that feels: ${formData.tonePreference}.
    Please, return the results(${RESULT_NUM} movies) in a array. Each entry should be a object with the keys title, releaseYear and content.
    e.g:
   [{title: "Jumanji: Welcome to the Jungle", releaseYear: 2008, content: "This is a fun, adventurous movie with lots of humor."},{title: "Pirates of the Caribbean", releaseYear: 2000, content: "Series - You'll enjoy these fun, adventurous movies featuring Johnny Depp as the eccentric Captain Jack Sparrow."}]. 
  
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

      const movieArray = extractArrayFromText(data.result);

      onSubmitComplete(movieArray);
    } catch (error) {
      console.error("Error calling GPT backend:", error);
    } finally {
      setLoading(false);
      setActieBtn(null);
    }
  };

  // Call backend embedding search
  const handleEmbeddingSearch = async () => {
    setLoading(true);
    setActieBtn("DATABASE");
    const response = await fetch("http://localhost:3001/api/embedding-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    console.log(`Frontend result embeddding`);
    console.log(result);

    onSubmitComplete(result.results);

    try {
    } catch (error) {
      console.error(`Emebedding search error ${error}`);
    } finally {
      setLoading(false);
      setActieBtn(null);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-darkBlue text-white p-6 rounded-xl max-w-lg mx-auto space-y-6 shadow-lg"
    >
      <div>
        <div className="flex justify-end mb-10">
          {activeBtn !== "GPT" && activeBtn !== "DATABASE" && (
            <button
              onClick={() => {
                setLoading(true);
                setActieBtn("MOCK");
                setTimeout(() => {
                  onSubmitComplete(mockResults);
                  setLoading(false);
                }, 500);
              }}
              disabled={loading}
              className={`${
                loading ? "bg-yellow-400" : "bg-yellow-600 hover:bg-yellow-700"
              } mx-4 px-4 py-2 rounded-md font-semibold transition justify`}
            >
              {loading ? "Loading..." : "Use Mock Data"}
            </button>
          )}
        </div>
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
      {activeBtn !== "DATABASE" && activeBtn !== "MOCK" && (
        <button
          onClick={handleAskGPT}
          disabled={loading}
          className={`${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } mx-4 px-4 py-2 rounded-md font-semibold transition`}
        >
          {loading ? "Loading..." : "Ask GPT"}
        </button>
      )}
      {activeBtn !== "GPT" && activeBtn !== "MOCK" && (
        <button
          onClick={handleEmbeddingSearch}
          disabled={loading}
          className={`${
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } mx-4 px-4 py-2 rounded-md font-semibold transition`}
        >
          {loading ? "Loading..." : "Check your database"}
        </button>
      )}
    </form>
  );
};
