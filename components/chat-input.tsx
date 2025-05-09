"use client";

import { useContext, useEffect, useState } from "react";
import { ChatContext } from "./contexts";
import { chatStream } from "@/utils/api";

export function ChatInput() {
  const [content, setContent] = useState("");
  const { chat, updateCurrentChat, currentChat } = useContext(ChatContext);
  const currentSessionIndex = currentChat; // Replace with dynamic logic if needed
  const handleUpdate = (content: string) => {
    updateCurrentChat({
      //TODO: UPDATE TO use the correct session id
      sessionIndex: currentSessionIndex,
      value: {
        role: "user",
        name: "User",
        content: content,
      },
    });
  };
  //TODO: refactor error handling
  const handleSubmition = async () => {
    handleUpdate(content);
    setContent("");
    try {
      //TODO: use the correct session id
      const parsedChatHistory = chat[0].messages.map(
        ({ role, content, name }) => ({
          role,
          content,
          name,
        }),
      );
      //TODO: update to use the current session id
      const response = await chatStream({
        sessionId: chat[chat.length - 1].id,
        prompt: content,
        chatHistory: parsedChatHistory,
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
      updateCurrentChat({
        sessionIndex: currentSessionIndex,
        value: {
          role: "assistant",
          name: "Assistant",
          content: "",
        },
      });
      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const decodedText = decoder.decode(value, { stream: true });
        resultText += decodedText;

        updateCurrentChat({
          sessionIndex: currentSessionIndex,
          value: {
            role: "assistant",
            name: "Assistant",
            content: resultText,
          },
          messageIndex: "last",
        });
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
      }}
      className="flex w-full  max-w-sm sm:max-w-xl md:max-w-6xl gap-2 py-1 rounded"
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
