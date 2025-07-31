import { useState } from "react";
import { MovieForm } from "../component/MovieForm";
import { Result, type Movie } from "../component/Result";

type positionStr = "initial" | "final" | "middle" | "none";

export const SoloPage = () => {
  const [result, setResult] = useState<Movie[] | null>(null);
  const [position, setPosition] = useState<number>(0);

  const checkPosition = (): positionStr => {
    if (!result || result.length === 0) return "none";

    if (position === 0) {
      return "initial";
    } else if (position === result?.length - 1) {
      return "final";
    } else {
      return "middle";
    }
  };

  const posStr = checkPosition();

  return (
    <div className="min-h-screen bg-darkBlue text-white flex justify-center items-start p-10">
      {!result || result.length === 0 ? (
        <MovieForm
          onSubmitComplete={setResult}
          grouplimits={{
            people: 0,
            time: "",
          }}
        />
      ) : (
        <Result
          movie={result[position]}
          setPosition={setPosition}
          posStr={posStr}
          setResult={setResult}
        />
      )}
    </div>
  );
};
