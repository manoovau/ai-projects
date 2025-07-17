import { useState } from "react";
import { Form } from "../component/Form";
import { Result, type Movie } from "../component/Result";

export const SoloPage = () => {
  const [result, setResult] = useState<Movie[] | null>(null);

  return (
    <div className="min-h-screen bg-darkBlue text-white flex justify-center items-start p-10">
      {!result ? (
        <Form onSubmitComplete={setResult} />
      ) : (
        <Result movie={result[0]} />
      )}
    </div>
  );
};
