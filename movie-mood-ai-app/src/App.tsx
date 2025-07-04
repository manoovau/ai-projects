import "./App.css";
import movies from "./data/content"; // Adjust path accordingly

function App() {
  console.log(movies);

  return (
    <div className="bg-gray-900 flex items-center justify-center h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-white">
        🎬 MovieMood
      </h1>
    </div>
  );
}

export default App;
