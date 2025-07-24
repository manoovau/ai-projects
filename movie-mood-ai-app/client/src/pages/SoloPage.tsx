import { useState } from "react";
import { Form } from "../component/Form";
import { Result, type Movie } from "../component/Result";

export const SoloPage = () => {
  const [result, setResult] = useState<Movie[] | null>(null);
  const [position, setPosition] = useState<number>(0);

  const checkPosition = () => {
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
        <Form onSubmitComplete={setResult} />
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
