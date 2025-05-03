"use client";

import { useContext, useState } from "react";
import { ChatContext } from "./contexts";
import { chatStream } from "@/utils/api";

export function ChatInput() {
  const [content, setContent] = useState("");
  const chatHistory = useContext(ChatContext);
  const handleUpdate = (content: string) =>
    chatHistory.updateChat((oldChat) => [
      ...oldChat,
      { role: "user", content: content, name: "karim" },
    ]);
  //TODO: refactor error handling
  const handleSubmition = async () => {
    try {
      //TODO: use the correct session id
      const response = await chatStream({
        sessionId: "76d053a8-21ac-11f0-8b1c-862ccfb052e2",
        prompt: content,
        chatHistory: chatHistory.chat,
        name: "User",
      });
      if (response.ok) {
        console.log("response ", response);
      } else {
        console.error("server responded with ", response);
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader stream found");
      }
      let resultText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const decodedText = decoder.decode(value, { stream: true });
        resultText += decodedText;
        chatHistory.updateChat((oldChat) => [
          ...oldChat.filter((chat, index) => {
            if (index === oldChat.length - 1) {
              if (chat.role === "assistant") return false;
              return true;
            }
            return true;
          }),
          {
            role: "assistant",
            content: resultText,
            name: "Assistant",
          },
        ]);
      }
    } catch (error) {
      //TODO: show a toast when somthing goes wrong
      console.error("form submition error", error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmition();
        handleUpdate(content);
        setTimeout(() => setContent(""), 500);
      }}
      className="flex gap-2 py-1 rounded"
    >
      <input
        className="outline-2 bg-gray-300 flex-1 rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button className="bg-amber-400 px-2 py-1 rounded" type="submit">
        update chat
      </button>
    </form>
  );
}
