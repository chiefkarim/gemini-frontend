"use client";

import { useContext, useState } from "react";
import { ChatContext } from "./contexts";
import { chatStream } from "@/utils/api";
import { Stream } from "stream";

//TODO: improve form submition and reduce condition race
// one way could be to update the ui always first and let the form submition happen in the back
// impliment retry button if form submition fails for some reason

export function ChatInput() {
  const [content, setContent] = useState("");
  const chatHistory = useContext(ChatContext);
  const handleUpdate = (content: string) =>
    chatHistory.updateChat((oldChat) => [
      ...oldChat,
      { role: "user", content: content },
    ]);
  //TODO: handle the streamed response
  //TODO: refactor error handling
  const handleSubmition = async () => {
    try {
      const response = await chatStream({
        prompt: content,
        chatHistory: chatHistory.chat,
      });
      if (response.ok) {
        console.log("response ", response);
      } else {
        console.error("server responded with ", response);
      }
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        chatHistory.setRetry(true);
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
          { role: "assistant", content: resultText },
        ]);
      }
    } catch (error) {
      console.error("form submition error", error);
      chatHistory.setRetry(true);
    }
  };
  //FIX: when to show retry button and when to hide it
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
