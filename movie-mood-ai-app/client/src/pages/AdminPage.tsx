import { useState } from "react";
import { AdminProfile } from "../component/AdminProfile";
import { AdminActions } from "../component/AdminActions";

export const AdminPage = () => {
  const [adminPage, setAdminPage] = useState<string>("");
  console.log(adminPage);
  return (
    <div className="min-h-screen bg-darkBlue text-white flex flex-col items-center p-10 space-y-8">
      <div className="flex space-x-4">
        <button
          onClick={() => setAdminPage("profile")}
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
        >
          Go to Profile
        </button>

        <button
          onClick={() => setAdminPage("action")}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-800 transition"
        >
          Admin Actions
        </button>
      </div>

      <div className="w-full max-w-4xl">
        {adminPage === "profile" && <AdminProfile />}
        {adminPage === "action" && <AdminActions />}
      </div>
    </div>
  );
};
