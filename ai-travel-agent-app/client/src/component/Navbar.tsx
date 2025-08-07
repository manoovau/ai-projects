import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="text-DarkDustyRose pb-10 fixed top-0 left-0 w-full bg-sandDollar shadow-md z-50">
      <div className="mt-10 mb-5 max-w-4xl mx-auto px-4  flex items-center relative">
        <Link
          to="/"
          className="flex items-center space-x-1 hover:text-DarkDustyRose-200 transition ml-auto"
          title="Home"
        >
          <h1 className="text-2xl font-bold mx-auto absolute left-1/2 transform -translate-x-1/2">
            AI Travel Agent
          </h1>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-3  flex justify-center space-x-6">
        <Link to="/trip" className="hover:underline ">
          Plan your Trip
        </Link>
        <Link to="/flight" className="hover:underline ">
          Book your flight
        </Link>
        <Link to="/accommodation" className="hover:underline">
          Book your Accommodation
        </Link>
      </div>
    </nav>
  );
};
