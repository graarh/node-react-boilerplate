export const messagesLimit = 50;

export interface ChatMessage {
  id: number;
  uid: string;
  text: string;
  timestamp: number;
}
