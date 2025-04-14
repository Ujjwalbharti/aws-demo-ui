"use client";

import GoToDashboardButton from "@/component/buttons/GotoDashboardButton";
import Logout from "@/component/buttons/Logout";
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
  }, [name, token]);

  if (!queue) {
    return (
      <RequireAuth>
        <Loading />
      </RequireAuth>
    );
  }

  return (
    <RequireAuth>
      <div className="flex flex-col items-center justify-center gap-4 p-4">
        <Logout />
        <GoToDashboardButton />
        <div className="text-2xl font-bold">
          <span>Queue Name : </span>
          <p>{queue.queueName}</p>
        </div>
        <div className="text-xl font-semibold">
          <span>Visibility Timeout : </span>
          <p>{queue.visibilityTimeout}</p>
        </div>
      </div>
    </RequireAuth>
  );
}
