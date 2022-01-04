export interface IKafkaMessage<T> {
  topic: string;
  partition: number;
  timestamp: string;
  size: number;
  attributes: number;
  offest: string;
  key: any;
  value: T;
  headers: Record<string, any>;
}
