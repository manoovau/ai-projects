import { useState } from "react";

import type { GroupLimitType } from "../pages/GroupPage";

interface FormProps {
  setGroupLimits: (GroupLimit: GroupLimitType) => void;
}

export const GroupFormLimits = ({ setGroupLimits }: FormProps) => {
  const [people, setPeople] = useState<number>(0);
  const [time, setTime] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGroupLimits({ people: people, time: time });
  };

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.trim();
    const parsed = parseInt(input, 10);

    if (!isNaN(parsed)) {
      setPeople(Math.min(20, parsed));
    } else {
      setPeople(0); // Or optionally do nothing, or track invalid input separately
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-darkBlue text-white p-6 rounded-xl max-w-lg mx-auto space-y-6 shadow-lg"
    >
      <div>
        <label htmlFor="howManyPeople" className="block font-semibold mb-1">
          How many people?
        </label>
        <input
          type="text"
          id="howManyPeople"
          name="howManyPeople"
          value={people}
          onChange={handlePeopleChange}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="max: 20 people"
          required
        />
      </div>

      <div>
        <label htmlFor="time" className="block font-semibold mb-1">
          How much time do you have?
        </label>
        <input
          type="text"
          id="time"
          name="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g: 1h 50 min"
          required
        />
      </div>

      <button
        className={`bg-green-600 hover:bg-green-700 mx-4 px-4 py-2 rounded-md font-semibold transition`}
      >
        Start
      </button>
    </form>
  );
};
