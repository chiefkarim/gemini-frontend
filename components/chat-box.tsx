"use client";

import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./contexts";
import { chatStream } from "@/utils/api";
import { MarkdownWrapper } from "./markdown-wrapper";

export function ChatBox() {
  const chatHistory = useContext(ChatContext);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  //TODO: add transitions to the text poping in the chat box
  useEffect(() => {
    const container = chatBoxRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });

  const clearChat = () => {
    chatHistory.updateChat([]);
  };
  const handleRetry = async () => {
    console.log("retrying");
    chatHistory.setRetry(false);
    try {
      console.log("conent", chatHistory.chat[0]);
      const content =
        chatHistory.chat.length === 1
          ? chatHistory.chat[0].content
          : chatHistory.chat[-1].content;
      const response = await chatStream({
        prompt: content,
        chatHistory: chatHistory.chat,
      });
      console.log("retry response", response);
    } catch (error) {
      console.error("chatbox level ", error);
      chatHistory.setRetry(true);
    }
  };

  return (
    <div
      ref={chatBoxRef}
      className="outline-1 px-4 py-3 h-[65vh] w-[80vw] overflow-y-auto rounded"
    >
      <div className="flex justify-end sticky top-0 right-0">
        <button onClick={clearChat} className="bg-red-400 px-2 py-1  rounded">
          clear Chat
        </button>
      </div>
      {chatHistory.chat.length === 0 ? (
        <h1 className="mr-5">How may i assist you today?</h1>
      ) : null}
      {chatHistory.chat.map((i, idx) => {
        return chatHistory.retry && idx === chatHistory.chat.length - 1 ? (
          <div key={i + "" + idx}>
            <div className="">
              <p className="px-5 py-2 bg-gray-200  rounded ">{i.content}</p>
            </div>
            <p>
              Ops something went wrong please try again!
              <button
                onClick={handleRetry}
                className="outline-1 bg-red-200 px-2 py-1 rounded"
              >
                Retry
              </button>
            </p>
          </div>
        ) : (
          <div key={i + "" + idx}>
            {i.role === "user" ? (
              <div className="flex justify-end rounded">
                <p className="font-extrabold px-5 py-2 bg-gray-200  rounded">
                  {i.content}
                </p>
              </div>
            ) : (
              <MarkdownWrapper content={i.content} />
            )}
          </div>
        );
      })}
    </div>
  );
}
