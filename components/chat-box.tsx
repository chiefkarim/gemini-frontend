"use client";

import { useContext, useEffect, useRef } from "react";
import { ChatContext } from "./contexts";
import { MarkdownWrapper } from "./markdown-wrapper";

//TODO: remove retry button logic

export function ChatBox() {
  const chatHistory = useContext(ChatContext);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  //TODO: add transitions to the text poping in the chat box
  //TODO: FIX not being able to scroll up while the backend is streaming the response

  useEffect(() => {
    const container = chatBoxRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  });

  const clearChat = () => {
    chatHistory.updateChat([]);
  };

  const handleCopy = (content: string) => {
    const startIndicator = "```markdown\n";
    const endIndicator = "```\n";
    const startIndex = content.indexOf(startIndicator) + startIndicator.length;
    const endIndex = content.lastIndexOf(endIndicator) - 1;
    const markdown = content.slice(startIndex, endIndex);
    navigator.clipboard
      .writeText(markdown)
      .then(() => {
        //TODO: add a toast
      })
      .catch((e) => console.error("something went wrong", e));
    console.log("markdown", markdown);
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
                <button
                  onClick={() => handleCopy(i.content)}
                  className="outline-1 bg-green-200 px-2 py-1 rounded"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
