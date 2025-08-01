import { useState } from "react";
import { MovieForm } from "../component/MovieForm";
import { Result, type Movie } from "../component/Result";
import { GroupFormLimits } from "../component/GroupFormLimits";

type positionStr = "initial" | "final" | "middle" | "none" | "one";
export interface GroupLimitType {
  people: number;
  time: string;
}

export const GroupPage = () => {
  const [result, setResult] = useState<Movie[] | null>(null);
  const [position, setPosition] = useState<number>(0);
  const [grouplimits, setGroupLimits] = useState<GroupLimitType>({
    people: 0,
    time: "",
  });

  const checkPosition = (): positionStr => {
    if (!result || result.length === 0) return "none";

    if (result.length === 1) return "one";

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
      {grouplimits.people === 0 ? (
        <GroupFormLimits setGroupLimits={setGroupLimits} />
      ) : !result || result.length === 0 ? (
        <MovieForm onSubmitComplete={setResult} grouplimits={grouplimits} />
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
