export interface SendMessageRequest {
    queueName: string;
    messages: string[];
}

export interface MessagePollRequest {
    queueName: string;
    limit: number;
}

export interface AcknowledgeMessageRequest {
    queueName: string;
    messageIds: string[];
}

export interface MessageDTO {
    message: string;
    messageId: string;
    queueId: number;
}


