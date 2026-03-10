"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Minimize2,
  RotateCcw
} from "lucide-react";
import siteData from "@/data/site.json";
import chatbotConfig from "@/data/chatbot.json";
import Image from "next/image";

interface Message {
  id: number;
  role: "bot" | "user";
  text: string;
  time: string;
  streaming?: boolean;
}

interface GeminiPart {
  text: string;
}
interface GeminiHistory {
  role: "user" | "model";
  parts: GeminiPart[];
}

const BOT_API_URL = "/api/chatbot";

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "bot",
    text: chatbotConfig.welcomeMessage,
    time: ""
  }
];

const QUICK_REPLIES = chatbotConfig.quickReplies;

function getTime() {
  return new Date().toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatText(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [history, setHistory] = useState<GeminiHistory[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (isOpen) {
      setHasNotification(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const resetChat = () => {
    abortRef.current?.abort();
    setMessages(INITIAL_MESSAGES);
    setHistory([]);
    setIsTyping(false);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping || isStreaming) return;

    const trimmed = text.trim();
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: trimmed,
      time: getTime()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Build Gemini history including this new user turn
    const nextHistory: GeminiHistory[] = [
      ...history,
      { role: "user", parts: [{ text: trimmed }] }
    ];

    const botMsgId = Date.now() + 1;
    let fullText = "";

    try {
      abortRef.current = new AbortController();
      const res = await fetch(BOT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
        signal: abortRef.current.signal
      });

      if (!res.ok || !res.body) {
        // Read actual error message from server
        let errMsg = `Lỗi server (${res.status})`;
        try {
          const json = await res.json();
          if (json?.error) errMsg = json.error;
        } catch {
          /* ignore */
        }
        throw new Error(errMsg);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      setIsTyping(false);

      // Add placeholder streaming message
      setMessages((prev) => [
        ...prev,
        {
          id: botMsgId,
          role: "bot",
          text: "",
          time: getTime(),
          streaming: true
        }
      ]);

      let buffer = "";

      const processLine = (raw: string) => {
        if (!raw.startsWith("data: ")) return;
        const payload = raw.slice(6).trim();
        if (payload === "[DONE]") return;
        try {
          const parsed = JSON.parse(payload);
          if (parsed.error) throw new Error(parsed.error);
          if (parsed.text) {
            fullText += parsed.text;
            const snap = fullText;
            setMessages((prev) =>
              prev.map((m) => (m.id === botMsgId ? { ...m, text: snap } : m))
            );
          }
        } catch (e) {
          if (e instanceof Error && e.message !== payload) throw e;
        }
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (buffer.trim()) processLine(buffer.trim());
          break;
        }
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) processLine(line.trim());
      }

      // Finalize message & update history
      setMessages((prev) =>
        prev.map((m) =>
          m.id === botMsgId ? { ...m, streaming: false, time: getTime() } : m
        )
      );
      setHistory([
        ...nextHistory,
        { role: "model", parts: [{ text: fullText }] }
      ]);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setIsTyping(false);
      const errText =
        err instanceof Error
          ? `⚠️ ${err.message}`
          : "⚠️ Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!";
      setMessages((prev) => {
        // replace streaming placeholder if present, else add new
        const has = prev.find((m) => m.id === botMsgId);
        if (has)
          return prev.map((m) =>
            m.id === botMsgId ? { ...m, text: errText, streaming: false } : m
          );
        return [
          ...prev,
          { id: botMsgId, role: "bot", text: errText, time: getTime() }
        ];
      });
    }
  };

  const isStreaming = messages.some((m) => m.streaming);

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-40 right-4 md:right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-border"
            style={{ height: "520px" }}
          >
            {/* Header */}
            <div className="bg-cta-gradient p-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    Trợ lý {siteData.companyName}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-white/80 text-xs">
                      Đang trực tuyến
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={resetChat}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  aria-label="Làm mới cuộc trò chuyện"
                  title="Làm mới"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1"
                  aria-label="Đóng chat"
                >
                  <Minimize2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-nav-white">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === "bot" ? "bg-cta-gradient" : "bg-gray-200"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <User className="w-4 h-4 text-gray-600" />
                    )}
                  </div>

                  <div
                    className={`max-w-[75%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}
                  >
                    <div
                      className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "bot"
                          ? "bg-white text-heading-dark rounded-tl-sm shadow-sm border border-border"
                          : "bg-cta-gradient text-white rounded-tr-sm"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          formatText(msg.text).replace(/\n/g, "<br/>") +
                          (msg.streaming
                            ? "<span class='inline-block w-0.5 h-4 bg-current ml-0.5 animate-pulse align-middle'></span>"
                            : "")
                      }}
                    />
                    {msg.time && (
                      <span className="text-[10px] text-gray-400 px-1">
                        {msg.time}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-cta-gradient flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-border rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 2 && !isTyping && (
              <div className="px-3 py-2 flex gap-2 flex-wrap bg-white border-t border-border flex-shrink-0">
                {QUICK_REPLIES.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    disabled={isTyping || isStreaming}
                    className="text-xs px-3 py-1.5 rounded-full border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-white border-t border-border flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                placeholder={
                  isTyping || isStreaming
                    ? "Đang trả lời..."
                    : "Nhập tin nhắn..."
                }
                disabled={isTyping || isStreaming}
                className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-nav-white focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isTyping || isStreaming}
                className="w-9 h-9 bg-cta-gradient rounded-lg flex items-center justify-center text-white disabled:opacity-40 hover:shadow-md transition-all flex-shrink-0"
                aria-label="Gửi"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen((v) => !v)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 right-4 md:right-6 z-50 w-14 h-14 bg-cta-gradient rounded-full shadow-lg flex items-center justify-center text-white"
        aria-label="Mở chat hỗ trợ"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {hasNotification && !isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
      </motion.button>

      {/* Zalo Button */}
      <motion.a
        href="https://zalo.me/0923250327"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 right-4 md:right-6 z-50"
        aria-label="Liên hệ qua Zalo"
      >
        <Image
          src="/zalo.svg"
          alt="Zalo"
          className="w-16 h-16"
          width={64}
          height={64}
        />
      </motion.a>
    </>
  );
}
