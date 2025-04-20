"use client";
import { queueService } from "@/services/queueService";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "@/context/GlobalContext";

export default function DeleteQueue({ queueName }: { queueName: string }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { token, deleteAuthToken } = useGlobalContext();
  async function handleDelete() {
    const response = await queueService.deleteQueue(queueName, token as string);
    setIsOpen(false);
    if (response.status === 401) {
      deleteAuthToken();
    }
    if (response.status === 204) {
      router.replace("/");
    }
  }
  return (
    <>
      <button
        className={`text-white font-mono font-extrabold bg-red-600 p-3 border-2 rounded-lg`}
        onClick={() => setIsOpen(true)}
      >
        Delete Queue
      </button>
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-10 ${
          !isOpen ? "hidden" : ""
        }`}
      ></div>
      <div
        className={`absolute z-20 top-1/3  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold">
            Are you sure want to delete?
          </span>
          <div className="flex gap-6 mt-4">
            <button
              className="bg-red-500 text-white font-bold font-serif px-4 py-2 rounded-md hover:bg-red-800"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              className="bg-black text-white font-serif font-bold px-4 py-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsOpen(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
