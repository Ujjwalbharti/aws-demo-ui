"use client";

import RequireAuth from "@/component/RequireAuth";
import { useGlobalContext } from "@/context/GlobalContext";

export default function HomePage() {
  const { deleteAuthToken } = useGlobalContext();

  const handleLogout = () => {
    deleteAuthToken();
  };

  return (
    <RequireAuth>
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Hello World</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </RequireAuth>
  );
}
