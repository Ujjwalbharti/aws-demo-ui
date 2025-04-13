"use client";

import { useGlobalContext } from "@/context/GlobalContext";

export default function Logout() {
  const { deleteAuthToken } = useGlobalContext();

  const handleLogout = () => {
    deleteAuthToken();
  };
  return (
    <div className="absolute top-0 right-0 p-2">
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
