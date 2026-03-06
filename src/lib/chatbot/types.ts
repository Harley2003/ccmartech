// Chatbot API Types
// Placeholder - implement actual chatbot integration later

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatbotConfig {
  apiEndpoint: string;
  model?: string;
  maxTokens?: number;
  temperature?: number;
}
