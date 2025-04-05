export interface Queue {
  queueName: string;
  visibilityTimeout: number;
}

export interface CreateQueueRequest {
  queueName: string;
  visibilityTimeout: number;
}
