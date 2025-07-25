import { Route, Routes } from "react-router-dom";

import "./App.css";
import movies from "./data/content";
import { SoloPage } from "./pages/SoloPage";
import { GroupPage } from "./pages/GroupPage";
import { Navbar } from "./component/Navbar";
import { AdminPage } from "./pages/AdminPage";

function App() {
  console.log(movies);

  return (
    <div className="bg-darkBlue text-white min-h-screen transition-opacity duration-700 pt-32">
      <Navbar />
      <div className="container mx-auto px-4 py-6 text-center">
        <Routes>
          <Route path="/solo" element={<SoloPage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
