"use client";

import DeleteQueue from "@/component/buttons/DeleteQueue";
import GoToDashboardButton from "@/component/buttons/GotoDashboardButton";
import Logout from "@/component/buttons/Logout";
import RecieveMessage from "@/component/buttons/RecieveMessage";
import SendMessage from "@/component/buttons/SendMessage";
import { Loading } from "@/component/Loading";
import RequireAuth from "@/component/RequireAuth";
import { useGlobalContext } from "@/context/GlobalContext";
import { Queue } from "@/models/queue";
import { queueService } from "@/services/queueService";
import { useEffect, useState, use } from "react";

interface QueueInfoPathProps {
  name: string;
}

interface QueueInfoProps {
  params: Promise<QueueInfoPathProps>;
}

export default function QueueInfo({ params }: QueueInfoProps) {
  const { name } = use(params);
  const { token, deleteAuthToken } = useGlobalContext();
  const [queue, setQueue] = useState<Queue | null>(null);

  useEffect(() => {
    async function fetchQueue() {
      if (token) {
        const response = await queueService.fetchQueueByName(
          name,
          token as string
        );
        if (response.status === 401) {
          deleteAuthToken();
        }
        setQueue(response.data as Queue);
      }
    }
    fetchQueue();
  }, [name, token, deleteAuthToken]);

  if (!queue) {
    return (
      <RequireAuth>
        <Loading />
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <Logout />
      <GoToDashboardButton />
      <div className="flex flex-col gap-10 mt-16 mx-10">
        <div className="flex justify-start gap-x-56 border-2 border-gray-200 shadow-md bg-gray-100 p-2">
          <div>
            <div className="flex text-2xl font-bold">
              <span>Queue Name : </span>
              <p className="px-1 font-mono text-green-700">{queue.queueName}</p>
            </div>
            <div className="flex text-2xl font-bold">
              <span>Visibility Timeout : </span>
              <p className="px-1 font-mono text-green-700">
                {queue.visibilityTimeout}
              </p>
            </div>
          </div>
          <div>
            <DeleteQueue queueName={queue.queueName} />
          </div>
        </div>
        <div className="flex gap-x-56 border-2 border-gray-200 shadow-md bg-gray-100 p-2">
          <SendMessage queueName={queue.queueName} />
        </div>
        <div className="flex gap-x-56 border-2 border-gray-200 shadow-md bg-gray-100 p-2">
          <RecieveMessage queueName={queue.queueName} />
        </div>
      </div>
    </RequireAuth>
  );
}
