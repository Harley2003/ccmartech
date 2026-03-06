// Chatbot Configuration
// Placeholder - configure actual chatbot API settings later

import type { ChatbotConfig } from "./types";

export const chatbotConfig: ChatbotConfig = {
  apiEndpoint: "/api/chatbot",
  model: undefined,
  maxTokens: 1024,
  temperature: 0.7,
};
