"use client";
import { useState } from "react";
import { useGlobalContext } from "@/context/GlobalContext";
import { MessageDTO } from "@/models/message";
import TableHeaderCheckbox from "../TableHeaderCheckbox";
import { messageService } from "@/services/messageService";
import DeleteMessage from "./DeleteMessage";
import ViewMessage from "./ViewMessage";

export default function RecieveMessage({ queueName }: { queueName: string }) {
  const { token, deleteAuthToken } = useGlobalContext();
  const [messageCount, setMessageCount] = useState(10);
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [numberOfItemOnPage, setNumberOfItemOnPage] = useState(5);
  const [messageDeleted, setMessageDeleted] = useState(false);

  const handleMessageCountChange = (value: number) => {
    if (value > 0 && value <= 30) {
      setMessageCount(value);
    }
    if (value < 1 || value > 30) {
      alert("Please enter a number between 1 and 30");
      setMessageCount(10);
    }
  };

  const handleRecieveMessage = async () => {
    setMessages([]);
    const response = await messageService.receiveMessages(
      {
        queueName,
        limit: messageCount,
      },
      token as string
    );
    if (response.status === 401) {
      deleteAuthToken();
    }
    if (response.status === 200) {
      setMessages(response.data as MessageDTO[]);
      setNumberOfItemOnPage(5);
    }
  };

  const toggleAll = () => {
    const rows = messages.slice(
      (pageNumber - 1) * numberOfItemOnPage,
      numberOfItemOnPage
    );
    if (selectedIds.length === rows.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(rows.map((row) => row.messageId));
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    );
  };

  const getVisibleRowCount = () => {
    const startIndex = (pageNumber - 1) * numberOfItemOnPage;
    const endIndex = Math.min(startIndex + numberOfItemOnPage, messages.length);
    return endIndex - startIndex;
  };

  const handleNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col w-full">
      <div>
        <span>Recieve Message</span>
      </div>
      <div className="flex items-center">
        <label className="text-black font-serif font-bold text-lg mb-2 block">
          Enter number of message to poll:{" "}
        </label>
        <input
          type="number"
          className="border-2 border-gray-300 rounded-md p-2 m-2"
          value={messageCount}
          onChange={(e) => handleMessageCountChange(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <button
          className="bg-green-600 text-white p-3 rounded-md hover:bg-green-700 font-mono font-bold"
          type="button"
          onClick={handleRecieveMessage}
        >
          Poll Messages
        </button>
      </div>
      <div
        className={`flex bg-red-600 text-white font-sans gap-10 w-1/2 p-1 items-center justify-between rounded-md mt-4 ${
          messageDeleted ? "" : "invisible"
        }`}
      >
        <div className="text-xl">
          <span>Message deleted successfully</span>
        </div>
        <div className="text-3xl pr-4 font-extrabold">
          <button onClick={() => setMessageDeleted(false)}>X</button>
        </div>
      </div>
      <div className="flex gap-4 justify-end">
        <ViewMessage messages={messages} selectedIds={selectedIds} />
        <DeleteMessage
          messages={messages}
          selectedIds={selectedIds}
          queueName={queueName}
          token={token as string}
          deleteAuthToken={deleteAuthToken}
          setMessages={setMessages}
          setSelectedIds={setSelectedIds}
          setMessageDeleted={setMessageDeleted}
        />
      </div>
      <table className="mt-6 table-fixed">
        <thead>
          <tr className="border-2 border-gray-700">
            <th className="border-x-2 border-x-gray-700 px-4 py-2 w-10">
              <TableHeaderCheckbox
                totalRows={getVisibleRowCount()}
                selectedCount={selectedIds.length}
                onToggle={toggleAll}
              />
            </th>
            <th className="border-x-2 border-x-gray-700 px-4 py-2 w-1/2">
              Message ID
            </th>
            <th className="border-x-2 border-x-gray-700 px-4 py-2 w-20">
              Queue ID
            </th>
          </tr>
        </thead>
        <tbody>
          {messages
            .slice(
              (pageNumber - 1) * numberOfItemOnPage,
              pageNumber * numberOfItemOnPage
            )
            .map((message, index) => (
              <tr key={index} className="text-center">
                <td className="border-x-2 border-x-gray-700 px-4 py-2 w-10">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-blue-600 rounded"
                    checked={selectedIds.includes(message.messageId)}
                    onChange={() => toggleRow(message.messageId)}
                  />
                </td>
                <td className="border-x-2 border-x-gray-700 px-4 py-2 w-1/2">
                  {message.messageId}
                </td>
                <td className="border-x-2 border-x-gray-700 px-4 py-2 w-20">
                  {message.queueId}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div
        className={`flex justify-center mt-8 gap-4 items-center ${
          messages.length === 0 ? "hidden" : ""
        }`}
      >
        <button
          className={`bg-gray-600 rounded-lg p-2 text-white font-bold hover:bg-gray-500 ${
            pageNumber === 1 ? "cursor-not-allowed" : ""
          }`}
          onClick={handlePreviousPage}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <span className="text-black font-bold">
          Page {pageNumber} of {Math.ceil(messages.length / numberOfItemOnPage)}
        </span>
        <button
          className={`bg-gray-600 rounded-lg p-2 text-white font-bold hover:bg-gray-500 ${
            pageNumber * numberOfItemOnPage >= messages.length
              ? "cursor-not-allowed"
              : ""
          }`}
          onClick={handleNextPage}
          disabled={pageNumber * numberOfItemOnPage >= messages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}
