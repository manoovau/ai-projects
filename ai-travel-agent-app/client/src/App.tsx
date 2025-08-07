import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./component/Navbar";
import { AccommodationPage } from "./pages/AccommodationPage";
import { FlightPage } from "./pages/FlightPage";
import { TripPage } from "./pages/TripPage";

function App() {
  return (
    <div className="bg-ivory text-gray min-h-screen transition-opacity duration-700 pt-32">
      <Navbar />
      <div className="container mx-auto px-4 py-6 text-center">
        <Routes>
          <Route path="/trip" element={<TripPage />} />
          <Route path="/flight" element={<FlightPage />} />
          <Route path="/accommodation" element={<AccommodationPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
