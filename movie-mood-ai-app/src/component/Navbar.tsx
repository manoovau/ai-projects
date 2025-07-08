import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-darkBlue text-white shadow-md z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col items-center justify-center space-y-2">
        <h1 className="text-2xl font-bold">🎬 MovieMood</h1>
        <div className="space-x-6">
          <Link to="/solo" className="hover:underline text-white">
            Movie Recommendation (Solo)
          </Link>
          <Link to="/group" className="hover:underline text-white">
            Movie Recommendation (Group)
          </Link>
        </div>
      </div>
    </nav>
  );
};
