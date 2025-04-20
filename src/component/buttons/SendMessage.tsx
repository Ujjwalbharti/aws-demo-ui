"use client";
import { useGlobalContext } from "@/context/GlobalContext";
import { messageService } from "@/services/messageService";
import { useState } from "react";

export default function SendMessage({ queueName }: { queueName: string }) {
  const [message, setMessage] = useState("");
  const { token, deleteAuthToken } = useGlobalContext();
  const [messageSent, setMessageSent] = useState(false);

  const handleSendMessage = async () => {
    if (!message) {
      alert("Message body cannot be empty");
      return;
    }
    const response = await messageService.sendMessage(
      {
        queueName,
        messages: [message],
      },
      token as string
    );
    if (response.status === 401) {
      deleteAuthToken();
    }
    if (response.status === 201) {
      setMessageSent(true);
      setMessage("");
    }
  };
  return (
    <div className="flex flex-col w-full">
      <div
        className={`flex bg-green-600 text-white font-sans gap-10 w-1/2 p-1 items-center justify-between rounded-md ${
          messageSent ? "" : "invisible"
        }`}
      >
        <div className="text-xl">
          <span>Message sent successfully</span>
        </div>
        <div className="text-3xl pr-4 font-extrabold">
          <button onClick={() => setMessageSent(false)}>X</button>
        </div>
      </div>
      <div className="flex gap-10">
        <div className="flex flex-col w-1/3">
          <label className="block mb-2">Message Body</label>
          <textarea
            className="border-2 border-gray-200 shadow-md bg-gray-50 p-2 w-full h-32 resize-none"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            maxLength={1000}
            minLength={1}
          ></textarea>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            className="bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 font-mono font-bold inline-block"
            type="button"
            onClick={handleSendMessage}
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}
