"use client";

import { useState } from "react";
import Logout from "@/component/buttons/Logout";
import RequireAuth from "@/component/RequireAuth";
import { queueService } from "@/services/queueService";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter, useSearchParams } from "next/navigation";

export default function QueuePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token } = useGlobalContext();
  const [visibilityTimeout, setVisibilityTimeout] = useState(0);
  const [queueName, setQueueName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await queueService.createQueue(
      {
        queueName,
        visibilityTimeout,
      },
      token as string
    );

    if (response.status === 201) {
      redirect();
    } else {
      setError(JSON.stringify(response.data));
    }
  };

  const redirect = () => {
     const redirectTo = searchParams.get("redirect") ?? "/";
     router.replace(redirectTo);
  }

  return (
    <RequireAuth>
      <Logout />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-4 font-serif text-2xl font-extrabold">
          Create Queue
        </div>
        <form className="font-mono m-5 w-full max-w-sm" onSubmit={handleSubmit}>
          <label className="block mb-2">Queue Name</label>
          <input
            type="text"
            placeholder="Queue Name"
            className="w-full border p-2 mb-4"
            value={queueName}
            onChange={(e) => setQueueName(e.target.value)}
            required
          />
          <div className="mb-2">
            Visibility Timeout: {visibilityTimeout} seconds
          </div>
          <input
            type="range"
            min="0"
            max="300"
            className="w-full mb-2"
            value={visibilityTimeout}
            onChange={(e) => setVisibilityTimeout(Number(e.target.value))}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full block bg-blue-500 text-white p-2 rounded"
          >
            Create Queue
          </button>
          <button
            type="button"
            className="w-full block bg-red-500 text-white p-2 rounded my-2"
            onClick={redirect}
          >
            Cancel
          </button>
        </form>
      </div>
    </RequireAuth>
  );
}
