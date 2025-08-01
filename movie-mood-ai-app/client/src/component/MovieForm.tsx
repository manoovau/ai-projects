import { useState } from "react";
import { type Movie } from "./Result";
import mockResults from "../data/mock_embedding_result";
import { type GroupLimitType } from "../pages/GroupPage";

interface FormProps {
  onSubmitComplete: (movies: Movie[]) => void;
  grouplimits: GroupLimitType;
}

type FormDataType = {
  favoriteMovie: string;
  moodType: string;
  tonePreference: string;
  [key: string]: string; // Dynamic keys
};

type ActiveBtnType = "GPT" | "DATABASE" | "MOCK";

function parseDurationToMinutes(time: string): number {
  const lower = time.toLowerCase();

  // Match "X hr" or "X hour"
  const hoursMatch = lower.match(/(\d+)\s*(h|hr|hour|hours)/);
  const hours = hoursMatch ? parseInt(hoursMatch[1], 10) : 0;

  // Match "Y min" or "Y minutes"
  const minutesMatch = lower.match(/(\d+)\s*(m|min|minute|minutes)/);
  const minutes = minutesMatch ? parseInt(minutesMatch[1], 10) : 0;

  // Match formats like "110 min" with no hour part
  if (!hours && !minutes) {
    const justNumber = lower.match(/^\s*(\d+)\s*$/);
    if (justNumber) {
      return parseInt(justNumber[1], 10);
    }
  }

  return hours * 60 + minutes;
}

export const MovieForm = ({ onSubmitComplete, grouplimits }: FormProps) => {
  const [formData, setFormData] = useState<FormDataType>({
    favoriteMovie: "",
    moodType: "",
    tonePreference: "",
  });

  const [formDataGroup, setFormDataGroup] = useState<FormDataType>({
    favoriteMovie: "",
    moodType: "",
    tonePreference: "",
  });

  const RESULT_NUM = 5;

  const [loading, setLoading] = useState(false);
  const [activeBtn, setActieBtn] = useState<ActiveBtnType | null>(null);
  const EMBEDDING_BTN_INIT = "Check your database";
  const EMBEDDING_BTN_NO_DATA = "No data Found. Try with GPT";

  const [embedddingBtnText, setEmbedddingBtnText] =
    useState<string>(EMBEDDING_BTN_INIT);

  const [peopleCounter, setPeopleCounter] = useState<number>(0);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
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

    const prompt =
      grouplimits.people !== 0 && peopleCounter === grouplimits.people
        ? `
    My favorite movies are: ${formDataGroup.favoriteMovie} .
    I'm in the mood for: ${formDataGroup.moodType}.
    I want a movie that feels: ${formDataGroup.tonePreference}.
    I have around ${grouplimits.time}. Only recommend movies with similar or shorter durations.
    Please, return the results(${RESULT_NUM} movies) in a array. Each entry should be a object with the keys title, releaseYear and content (title, duration and description).
    e.g:
   [{title: "Jumanji: Welcome to the Jungle", releaseYear: 2008, content: "Jumanji: Welcome to the Jungle(1 hr 59 min): This is a fun, adventurous movie with lots of humor."},{title: "Barbie", releaseYear: 2023, content: "Barbie (1 hr 54 min): Barbie suffers a crisis that leads her to question her world and her existence. Adventure, Comedy, Fantasy film released in 2023. Directed by Greta Gerwig. Written by Greta Gerwig and Noah Baumbach. Starring Margot Robbie, Ryan Gosling and Issa Rae. Rated 7.0 on IMDB"}]. 
   `
        : `
    My favorite movie is: ${formData.favoriteMovie} .
    I'm in the mood for something: ${formData.moodType}.
    I want something that feels: ${formData.tonePreference}.
    Please, return the results(${RESULT_NUM} movies) in a array. Each entry should be a object with the keys title, releaseYear and content (title, duration and description).
    e.g:
   [{title: "Jumanji: Welcome to the Jungle", releaseYear: 2008, content: "Jumanji: Welcome to the Jungle(1 hr 59 min): This is a fun, adventurous movie with lots of humor."},{title: "Barbie", releaseYear: 2023, content: "Barbie (1 hr 54 min): Barbie suffers a crisis that leads her to question her world and her existence. Adventure, Comedy, Fantasy film released in 2023. Directed by Greta Gerwig. Written by Greta Gerwig and Noah Baumbach. Starring Margot Robbie, Ryan Gosling and Issa Rae. Rated 7.0 on IMDB"}]. 
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
    const minutes = parseDurationToMinutes(grouplimits.time);

    console.log("click handleEmbeddingSearch");
    console.log("minutes");
    console.log(minutes);
    console.log("grouplimits.time");
    console.log(grouplimits.time);
    const response = await fetch("http://localhost:3001/api/embedding-search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData, grouplimits, minutes }),
    });

    const result = await response.json();
    console.log(`Frontend result embeddding Movie Form`);
    console.log(result);
    if (result.results.length === 0) {
      setEmbedddingBtnText(EMBEDDING_BTN_NO_DATA);
      console.log("Result length === 0 ");
    } else {
      onSubmitComplete(result.results);
      console.log("Result length !== 0 ");
    }

    try {
    } catch (error) {
      console.error(`Emebedding search error ${error}`);
    } finally {
      setLoading(false);
      setActieBtn(null);
    }
  };

  const handleNextPerson = () => {
    setFormDataGroup((prev) => ({
      ...prev,
      favoriteMovie:
        String(prev.favoriteMovie ?? "") + ", " + formData.favoriteMovie,
      moodType: String(prev.moodType ?? "") + ", " + formData.moodType,
      tonePreference:
        String(prev.tonePreference ?? "") + ", " + formData.tonePreference,
    }));

    if (peopleCounter < grouplimits.people) {
      setFormData({
        favoriteMovie: "",
        moodType: "",
        tonePreference: "",
      });
      setPeopleCounter((prev) => prev + 1);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="bg-darkBlue text-white p-6 rounded-xl max-w-lg mx-auto space-y-6 shadow-lg"
    >
      {embedddingBtnText === EMBEDDING_BTN_NO_DATA && (
        <h3>
          No Movie with this duration in your database. Please, try with the GPT
          button
        </h3>
      )}
      <div
        className={`${
          embedddingBtnText === EMBEDDING_BTN_NO_DATA
            ? "justify-start"
            : "justify-end"
        }flex  mb-10 `}
      >
        {activeBtn !== "GPT" &&
          activeBtn !== "DATABASE" &&
          (grouplimits.people === 0 ||
            (grouplimits.people !== 0 &&
              peopleCounter === grouplimits.people)) && (
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
      {grouplimits.people === 0 ||
      (grouplimits.people !== 0 && peopleCounter !== grouplimits.people) ? (
        <div>
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
            <label
              htmlFor="tonePreference"
              className="block font-semibold mb-1"
            >
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
        </div>
      ) : null}

      {activeBtn !== "DATABASE" &&
        activeBtn !== "MOCK" &&
        (grouplimits.people === 0 ||
          (grouplimits.people !== 0 &&
            peopleCounter === grouplimits.people)) && (
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

      {activeBtn !== "GPT" &&
        activeBtn !== "MOCK" &&
        embedddingBtnText !== EMBEDDING_BTN_NO_DATA &&
        (grouplimits.people === 0 ||
          (grouplimits.people !== 0 &&
            peopleCounter === grouplimits.people)) && (
          <button
            onClick={handleEmbeddingSearch}
            disabled={loading || embedddingBtnText === EMBEDDING_BTN_NO_DATA}
            className={`${
              loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
            } mx-4 px-4 py-2 rounded-md font-semibold transition`}
          >
            {loading ? "Loading..." : embedddingBtnText}
          </button>
        )}

      {grouplimits.people !== 0 && peopleCounter !== grouplimits.people && (
        <button
          onClick={handleNextPerson}
          disabled={loading}
          className={`${
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-700"
          } mx-4 px-4 py-2 rounded-md font-semibold transition`}
        >
          {loading
            ? "Loading..."
            : peopleCounter + 1 === grouplimits.people
            ? "Choose recommendation engine"
            : "Next Person"}
        </button>
      )}
    </form>
  );
};
