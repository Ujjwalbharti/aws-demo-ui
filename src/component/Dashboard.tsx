import { useEffect, useState } from "react";
import { Queue } from "@/models/queue";
import { queueService } from "@/services/queueService";
import { Loading } from "./Loading";
import Link from "next/link";

interface DashboardProps {
  token: string | null;
}

export default function Dashboard({ token }: DashboardProps) {
  const [queues, setQueues] = useState<Queue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQueues = async () => {
      if (!token) return;
      setLoading(true);
      try {
        const response = await queueService.fetchAllQueues(token);
        setQueues(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch queues:", error);
        setQueues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {queues && queues.length > 0 ? (
            queues.map((queue: Queue, index: number) => (
              <Link href={`/queue/${queue.queueName}`} key={index}>
                <div key={index} className="border p-4 rounded">
                  <h2 className="text-xl font-semibold">{queue.queueName}</h2>
                  <p>{queue.visibilityTimeout}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No queues available.</p>
          )}
        </div>
      )}
    </div>
  );
}
