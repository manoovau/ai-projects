import { useState } from "react";
import movies from "../data/content";

interface Props {
  isLogin: boolean;
}

export const AdminActions = ({ isLogin }: Props) => {
  const [loading, setLoading] = useState(false);

  const seedMovies = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/seed-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movies),
      });

      const data = await response.json();

      console.log("data");
      console.log(data);

      console.log("response");
      console.log(response);

      if (response.ok) {
        alert(
          `${data.message} 
          Entries inserted ${data.inserted}. 
          Entries duplicated ${data.duplicates}`
        );
        console.log(data);
      } else {
        alert(`❌ Failed to seed movies.
          ${data.message}`);
        console.error(data);
      }
    } catch (err) {
      console.error("❌ Error seeding movies:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Admin Actions
      </h3>

      <button
        onClick={seedMovies}
        disabled={loading || !isLogin}
        className={`w-full px-4 py-2 rounded font-medium transition duration-150 flex items-center justify-center space-x-2
    ${
      loading || !isLogin
        ? "bg-gray-400 cursor-not-allowed text-gray-700"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }
  `}
      >
        {loading ? (
          <div>
            <span className="animate-spin h-5 w-5 inline-block border-2 border-white border-t-transparent rounded-full"></span>
            <span>Loading...</span>
          </div>
        ) : !isLogin ? (
          <div>
            <span>🔒</span>
            <span>Action not allowed</span>
          </div>
        ) : (
          <div>
            <span>📥</span>
            <span>Seed Movies into Supabase</span>
          </div>
        )}
      </button>
    </div>
  );
};
