import { ApiResponse } from "@/models/common";
import { CreateQueueRequest, Queue } from "@/models/queue";
import { getApiUrl } from "@/utils/getApiUrl";

export interface QueueService {
  fetchQueueByName: (
    name: string,
    token: string
  ) => Promise<ApiResponse<Queue | string | null>>;
  fetchAllQueues: (
    token: string
  ) => Promise<ApiResponse<Queue[] | null | string>>;
  createQueue: (
    request: CreateQueueRequest,
    token: string
  ) => Promise<ApiResponse<string | null>>;
  deleteQueue: (
    name: string,
    token: string
  ) => Promise<ApiResponse<string | null>>;
}

export const queueService: QueueService = {
  fetchQueueByName: async function (
    name: string,
    token: string
  ): Promise<ApiResponse<Queue | string | null>> {
    const response = await fetch(getApiUrl(`v1/sqs/fetch/queue/${name}`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: response.status,
        data: errorText || null,
      };
    }

    const data = await response.json();
    return {
      status: response.status,
      data: data as Queue,
    };
  },

  fetchAllQueues: async function (
    token: string
  ): Promise<ApiResponse<Queue[] | null | string>> {
    const response = await fetch(getApiUrl(`v1/sqs/fetch/queues`), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: response.status,
        data: errorText || null,
      };
    }

    const data = await response.json();
    return {
      status: response.status,
      data: data as Queue[],
    };
  },
  createQueue: async function (
    request: CreateQueueRequest,
    token: string
  ): Promise<ApiResponse<string | null>> {
    const response = await fetch(getApiUrl(`v1/sqs/create`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body : JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: response.status,
        data: errorText || null,
      };
    }

    const data = await response.json();
    return {
      status: response.status,
      data: data as string,
    };
  },
  deleteQueue: async function (
    name: string,
    token: string
  ): Promise<ApiResponse<string | null>> {
    const response = await fetch(getApiUrl(`v1/sqs/delete/${name}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: response.status,
        data: errorText || null,
      };
    }

    const data = await response.json();
    return {
      status: response.status,
      data: data as string,
    };
  },
};
