"use client";

import { useState, FormEvent } from "react";
import { Paperclip, Mic, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat-message-list";
import { ChatInput } from "@/components/ui/chat-input";
import AnimatedBulbLogo from "@/components/ui/animated-bulb-logo";

export default function Home() {
  const [messages, setMessages] = useState<Array<{ id: number; content: string; sender: "user" | "ai" }>>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        content: input,
        sender: "user",
      },
    ]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          content: "I understand you want to build an app. Could you tell me more about your specific requirements and goals?",
          sender: "ai",
        },
      ]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div 
        className={`text-center space-y-4 transition-all duration-500 ease-in-out ${
          messages.length > 0 ? "opacity-0 -translate-y-4 h-0 overflow-hidden" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="flex justify-center w-96 h-96 mx-auto">
          <AnimatedBulbLogo size={384} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Welcome to vibecontext.io</h1>
        <p className="text-lg text-muted-foreground">type idea → get your docs → start shipping</p>
      </div>

      <div className="h-[600px] flex flex-col bg-background/50 backdrop-blur-sm">
        <div className="flex-1 overflow-hidden">
          <ChatMessageList>
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                variant={message.sender === "user" ? "sent" : "received"}
                className="max-w-[70%]"
              >
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  src={
                    message.sender === "user"
                      ? "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg"
                      : undefined
                  }
                  fallback={message.sender === "user" ? "US" : "AI"}
                />
                <ChatBubbleMessage
                  variant={message.sender === "user" ? "sent" : "received"}
                >
                  {message.content}
                </ChatBubbleMessage>
              </ChatBubble>
            ))}

            {isLoading && (
              <ChatBubble variant="received" className="max-w-[70%]">
                <ChatBubbleAvatar
                  className="h-8 w-8 shrink-0"
                  fallback="AI"
                />
                <ChatBubbleMessage isLoading />
              </ChatBubble>
            )}
          </ChatMessageList>
        </div>

        <div className="p-4">
          <form
            onSubmit={handleSubmit}
            className="relative rounded-xl bg-background/50 backdrop-blur-sm focus-within:ring-1 focus-within:ring-ring p-1"
          >
            <ChatInput
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="write your idea, and we will figure it out"
              className="min-h-12 resize-none rounded-lg bg-transparent border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-3 pt-0 justify-between">
              <div className="flex">
                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                >
                  <Paperclip className="size-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  type="button"
                >
                  <Mic className="size-4" />
                </Button>
              </div>
              <Button type="submit" size="sm" className="ml-auto gap-1.5">
                Send Message
                <SendIcon className="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}