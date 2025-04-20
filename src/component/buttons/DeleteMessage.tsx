"use client";
import { useState } from "react";

import { MessageDTO } from "@/models/message";
import { messageService } from "@/services/messageService";

export default function DeleteMessage({
  messages,
  selectedIds,
  queueName,
  token,
  deleteAuthToken,
  setMessages,
  setSelectedIds,
  setMessageDeleted,
}: {
  messages: MessageDTO[];
  selectedIds: string[];
  queueName: string;
  token: string;
  deleteAuthToken: () => void;
  setMessages: React.Dispatch<React.SetStateAction<MessageDTO[]>>;
  setSelectedIds: React.Dispatch<React.SetStateAction<string[]>>;
  setMessageDeleted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleDelete = async () => {
    const response = await messageService.deleteMessage(
      {
        queueName,
        messageIds: selectedIds,
      },
      token
    );
    if (response.status === 401) {
      deleteAuthToken();
    }
    if (response.status === 204) {
      setIsOpen(false);
      const newMessages = messages.filter(
        (message) => !selectedIds.includes(message.messageId)
      );
      setMessages(newMessages);
      setSelectedIds([]);
      setMessageDeleted(true);
    }
  };
  return (
    <div>
      <button
        className={`bg-gray-300 rounded-lg border-collapse p-2 text-black font-bold hover:bg-gray-500 ${
          selectedIds.length === 0 ? "text-gray-500 hover:bg-gray-300" : ""
        }`}
        disabled={selectedIds.length === 0}
        onClick={() => setIsOpen(true)}
      >
        Delete
      </button>

      <div
        className={`fixed inset-0 bg-black bg-opacity-80 z-10 ${
          !isOpen ? "hidden" : ""
        }`}
        onClick={() => setIsOpen(false)}
      ></div>
      <div
        className={`absolute z-20 top-1/2  left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-lg font-bold">
            Are you sure want to delete {selectedIds.length} messages?
          </span>
          <div>
            {selectedIds.map((id) => {
              return (
                <li key={id} className="text-sm mb-1">
                  {id}
                </li>
              );
            })}
          </div>
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
    </div>
  );
}
