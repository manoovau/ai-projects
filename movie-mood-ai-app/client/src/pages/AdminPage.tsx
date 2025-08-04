import { useState } from "react";
import { AdminProfile } from "../component/AdminProfile";
import { AdminActions } from "../component/AdminActions";

interface credentailsType {
  username: string;
  pw: string;
}

export const AdminPage = () => {
  const [adminPage, setAdminPage] = useState<string>("");
  const [credentials, setCredentials] = useState<credentailsType>({
    username: "",
    pw: "",
  });

  console.log(adminPage);
  return (
    <div>
      {credentials ? (
        <div>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-darkBlue text-white p-6 rounded-xl max-w-lg mx-auto space-y-6 shadow-lg"
          >
            <div>
              <label htmlFor="username" className="block font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block font-semibold mb-1">
                Password
              </label>
              <input
                type="text"
                id="password"
                name="password"
                value={credentials.pw}
                onChange={(e) =>
                  setCredentials({ ...credentials, pw: e.target.value })
                }
                className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
            </div>
          </form>
        </div>
      ) : (
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
      )}
    </div>
  );
};
