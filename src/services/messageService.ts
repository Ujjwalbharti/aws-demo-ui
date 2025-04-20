import { ApiResponse } from "@/models/common";
import { SendMessageRequest, MessagePollRequest, MessageDTO, AcknowledgeMessageRequest } from "@/models/message";
import { getApiUrl } from "@/utils/getApiUrl";

export interface MessageService {
  sendMessage: (
    request: SendMessageRequest,
    token: string
  ) => Promise<ApiResponse<string | null>>;
  receiveMessages: (
    request: MessagePollRequest,
    token: string
  ) => Promise<ApiResponse<MessageDTO[] | null | string>>;
  deleteMessage: (
    request: AcknowledgeMessageRequest,
    token: string
  ) => Promise<ApiResponse<string | null>>;
}

export const messageService: MessageService = {
  sendMessage: async function (
    request: SendMessageRequest,
    token: string
  ): Promise<ApiResponse<string | null>> {
    const response = await fetch(getApiUrl(`v1/sqs/send-messages`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
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

  receiveMessages: async function (
    request: MessagePollRequest,
    token: string
  ): Promise<ApiResponse<MessageDTO[] | null | string>> {
    const response = await fetch(getApiUrl(`v1/sqs/poll-messages`), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
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
      data: data as MessageDTO[],
    };
  },

  deleteMessage: async function (
    request: AcknowledgeMessageRequest,
    token: string
  ): Promise<ApiResponse<string | null>> {
    const response = await fetch(getApiUrl(`v1/sqs/acknowledge-messages`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: response.status,
        data: errorText || null,
      };
    }

    return {
      status: response.status,
      data: null,
    };
  },
};
