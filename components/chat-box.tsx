"use client";

import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./contexts";
import { MarkdownWrapper } from "./markdown-wrapper";

export function ChatBox() {
  const { chat, currentChat } = useContext(ChatContext);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  //TODO: add transitions to the text poping in the chat box
  //TODO: FIX not being able to scroll up while the backend is streaming the response

  useEffect(() => {
    const container = chatBoxRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });
  //TODO: update clear chat to delete chat on the databse

  return (
    <div
      ref={chatBoxRef}
      className="outline-1 px-4 py-3 h-[65vh] w-full max-w-sm sm:max-w-xl md:max-w-6xl overflow-y-auto rounded"
    >
      {chat.length === 0 ? (
        <h1 className="mr-5">How may i assist you today?</h1>
      ) : null}
      {chat[currentChat]?.messages &&
        chat[currentChat]?.messages.map((i, idx) => {
          return (
            <div key={i + "" + idx}>
              {i.role === "user" ? (
                <div className="flex justify-end rounded">
                  <p className="font-extrabold px-5 py-2 bg-gray-200  rounded">
                    {i.content}
                  </p>
                </div>
              ) : (
                <div>
                  <MarkdownWrapper content={i.content} />
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}
