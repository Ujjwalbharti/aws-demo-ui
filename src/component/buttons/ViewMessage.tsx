"use client";
import { useState } from "react";

import { MessageDTO } from "@/models/message";

export default function ViewMessage({
  messages,
  selectedIds,
}: {
  messages: MessageDTO[];
  selectedIds: string[];
}) {
  const getMessage = (): MessageDTO => {
    const message = messages.find(
      (message) => message.messageId === selectedIds[0]
    );
    return message as MessageDTO;
  };

  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        className={`bg-gray-300 rounded-lg border-collapse p-2 text-black font-bold hover:bg-gray-500 ${
          selectedIds.length !== 1 ? "text-gray-500 hover:bg-gray-300" : ""
        }`}
        disabled={selectedIds.length !== 1}
        onClick={() => setIsOpen(true)}
      >
        View Details
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-10 ${
          !isOpen ? "hidden" : ""
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <pre className="text-sm text-gray-800">
            {JSON.stringify(getMessage(), null, 2)}
          </pre>
          <button
            className="mt-4 bg-red-500 text-white p-2 rounded-lg hover:bg-red-700"
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
