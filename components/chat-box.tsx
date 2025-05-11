"use client";

import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "./contexts";
import { MarkdownWrapper } from "./markdown-wrapper";
import { cn } from "@/lib/utils";

export function ChatBox() {
  const { chat, currentChat } = useContext(ChatContext);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  //TODO: add auto scroll to the bottom
  return (
    <div
      ref={chatBoxRef}
      className="px-6 py-4 h-full w-full max-w-6xl overflow-y-auto rounded bg-white shadow-sm border border-gray-200"
    >
      {chat.length === 0 ? (
        <p className="text-gray-500 text-center italic">
          How may I assist you today?
        </p>
      ) : (
        chat[currentChat]?.messages?.map((msg, idx) => (
          <div
            key={idx}
            className={cn("mb-4 flex", {
              "justify-end": msg.role === "user",
              "justify-start": msg.role !== "user",
            })}
          >
            <div
              className={cn(
                "px-4 py-2 max-w-[85%] rounded-md text-sm whitespace-pre-wrap leading-relaxed",
                {
                  "bg-gray-100 text-gray-900": msg.role === "user",
                  "bg-gray-50 text-gray-800": msg.role !== "user", // assistant : fond plus clair, texte doux
                },
              )}
            >
              {msg.role === "user" ? (
                msg.content
              ) : (
                <MarkdownWrapper content={msg.content} />
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
