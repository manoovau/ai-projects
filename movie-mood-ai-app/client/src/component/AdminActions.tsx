import { useState } from "react";
import movies from "../data/content";

interface credentailsType {
  username: string;
  pw: string;
}

export const AdminActions = () => {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<credentailsType>({
    username: "",
    pw: "",
  });

  const [isAuth, setAuth] = useState(false);

  const seedMovies = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/seed-movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movies),
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Movies seeded successfully!");
        console.log(data);
      } else {
        alert("❌ Failed to seed movies");
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
        disabled={loading || !isAuth}
        className={`w-full px-4 py-2 rounded font-medium transition duration-150 flex items-center justify-center space-x-2
    ${
      loading || !isAuth
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
        ) : !isAuth ? (
          <div>
            <span>🔒</span>
            <span>Please, login</span>
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
