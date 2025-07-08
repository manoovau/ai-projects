import { useState } from "react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    console.log("Form submitted:", formData.favoriteMovie);
    console.log("Form submitted:", formData.moodType);
    console.log("Form submitted:", formData.tonePreference);
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
