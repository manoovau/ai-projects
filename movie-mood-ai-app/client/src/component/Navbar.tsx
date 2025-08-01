import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-darkBlue text-white shadow-md z-50">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center relative">
        <Link
          to="/"
          className="flex items-center space-x-1 text-white hover:text-blue-400 transition ml-auto"
          title="Home"
        >
          <h1 className="text-2xl font-bold mx-auto absolute left-1/2 transform -translate-x-1/2">
            🎬 MovieMood
          </h1>
        </Link>

        <Link
          to="/admin"
          className="flex items-center space-x-1 text-white hover:text-blue-400 transition ml-auto"
          title="Admin Panel"
        >
          <span className="text-xl text-white">
            <FaUserShield />
          </span>

          <span className="hidden sm:inline text-sm font-semibold">Admin</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-4 flex justify-center space-x-6">
        <Link to="/solo" className="hover:underline text-white">
          Movie Recommendation (Solo)
        </Link>
        <Link to="/group" className="hover:underline text-white">
          Movie Recommendation (Group)
        </Link>
      </div>
    </nav>
  );
};
