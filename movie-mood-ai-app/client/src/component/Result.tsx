import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import type { GroupLimitType } from "../pages/GroupPage";

export interface Movie {
  title: string;
  releaseYear: number;
  content: string;
}

interface ResultProps {
  movie: Movie;
  setPosition: Dispatch<SetStateAction<number>>;
  posStr: string;
  setResult: Dispatch<SetStateAction<Movie[] | null>>;
  setGroupLimits?: Dispatch<SetStateAction<GroupLimitType>>;
}

export const Result = ({
  movie,
  setPosition,
  posStr,
  setResult,
  setGroupLimits,
}: ResultProps) => {
  const { title, releaseYear, content } = movie;
  const [posterUrl, setPosterUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPoster = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/imdb-poster", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, releaseYear }),
        });
        const text = await response.text(); // 🔍 read raw response
        console.log("Raw response:", text);

        try {
          const data = JSON.parse(text); // try parsing it
          if (data.posterUrl) {
            setPosterUrl(data.posterUrl);
          } else {
            setPosterUrl(null);
          }
        } catch (err) {
          console.error("JSON parse error:", err);
          setPosterUrl(null);
        }
      } catch (error) {
        console.error("Error fetching IMDb poster ", error);
        setPosterUrl(null);
      }
    };

    fetchPoster();
  }, [title, releaseYear]);

  return (
    <div className="bg-gray-800 text-white rounded-lg shadow-md p-6 mt-6 space-y-4 max-w-xl">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setResult(null);
            setPosition(0);
            setGroupLimits?.({
              people: 0,
              time: "",
            });
          }}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-1 rounded-md transition duration-200"
        >
          Reset
        </button>
      </div>
      {posterUrl && (
        <img
          src={posterUrl}
          alt={`${title} Poster`}
          className="mx-auto rounded-lg shadow-md max-h-96"
        />
      )}
      <h3 className="text-2xl font-bold">
        {title} <span className="text-gray-400 text-lg">({releaseYear})</span>
      </h3>
      <p className="text-gray-300 text-justify block leading-relaxed whitespace-pre-line pb-2">
        {content}
      </p>
      {posStr === "initial" && (
        <div className="flex justify-center">
          <button
            onClick={() => setPosition((prev) => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
          >
            Next Movie
          </button>
        </div>
      )}

      {posStr === "middle" && (
        <div className="flex justify-center gap-6 mt-4">
          <button
            onClick={() => setPosition((prev) => prev - 1)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
          >
            Previous Movie
          </button>
          <button
            onClick={() => setPosition((prev) => prev + 1)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
          >
            Next Movie
          </button>
        </div>
      )}

      {posStr === "final" && (
        <div className="flex justify-center">
          <button
            onClick={() => setPosition((prev) => prev - 1)}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
          >
            Previous Movie
          </button>
        </div>
      )}
    </div>
  );
};
