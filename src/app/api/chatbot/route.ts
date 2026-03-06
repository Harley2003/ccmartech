import { NextRequest } from "next/server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import chatbotConfig from "@/data/chatbot.json";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

const model = genAI.getGenerativeModel({
  model: chatbotConfig.model,
  safetySettings,
  systemInstruction: chatbotConfig.systemInstruction,
  generationConfig: chatbotConfig.generationConfig,
});

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "Vui lòng nhập tin nhắn." }), { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY chưa được cấu hình." }), { status: 500 });
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const chat = model.startChat({ history: history ?? [] });
          const result = await chat.sendMessageStream(message);
          for await (const chunk of result.stream) {
            try {
              const text = chunk.text();
              if (text) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
              }
            } catch {
              // skip blocked chunks
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Lỗi không xác định";
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Server error";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
}

export async function GET() {
  return new Response(JSON.stringify({ status: "ok", message: "Chatbot API is running" }), {
    headers: { "Content-Type": "application/json" },
  });
}
