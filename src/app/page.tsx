"use client";

import Dashboard from "@/component/Dashboard";
import Logout from "@/component/buttons/Logout";
import RequireAuth from "@/component/RequireAuth";
import { useGlobalContext } from "@/context/GlobalContext";
import CreateQueueButton from "@/component/buttons/CreateQueue";

export default function HomePage() {
  const { token, deleteAuthToken } = useGlobalContext();

  return (
    <RequireAuth>
      <Logout />
      <Dashboard token={token} deleteAuthToken={deleteAuthToken} />
      <CreateQueueButton/>
    </RequireAuth>
  );
}
