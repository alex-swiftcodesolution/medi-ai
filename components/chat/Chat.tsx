// components/chat/Chat.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Message } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: Message = { role: "user", content: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        messages: [
          { role: "system", content: "You are Gemini, a helpful AI." },
          userMsg,
        ],
      }),
    });
    const { response } = await res.json();
    setMessages((m) => [...m, { role: "assistant", content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[85vh] px-4">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 mb-4 ${
                  m.role === "user" ? "justify-end" : ""
                }`}
              >
                {m.role === "assistant" && (
                  <Avatar>
                    <AvatarFallback>G</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg prose prose-sm dark:prose-invert ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.content}
                  </ReactMarkdown>
                </div>
                {m.role === "user" && (
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}
            {loading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-3"
              >
                <Avatar>
                  <AvatarFallback>G</AvatarFallback>
                </Avatar>
                <div className="bg-muted px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    {[0, 0.2, 0.4].map((d) => (
                      <motion.span
                        key={d}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.5,
                          delay: d,
                        }}
                        className="w-2 h-2 bg-gray-500 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask Gemini..."
            disabled={loading}
          />
          <Button onClick={send} disabled={loading || !input.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
