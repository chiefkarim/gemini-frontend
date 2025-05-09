"use client";

import { useContext, useState } from "react";
import { ChatContext } from "./contexts";
import { chatStream } from "@/utils/api";

export function ChatInput() {
  const [content, setContent] = useState("");
  const chatHistory = useContext(ChatContext);
  const handleUpdate = (content: string) => {
    const newChat = chatHistory.chat.map((session, index) => {
      if (index === chatHistory.chat.length - 1) {
        return {
          ...session,
          messages: [
            ...session.messages,
            {
              role: "user",
              name: "User",
              content: content,
            },
          ],
        };
      }
      return session;
    });
    chatHistory.updateChat(() => newChat);
  };

  //TODO: refactor error handling
  const handleSubmition = async () => {
    try {
      //TODO: use the correct session id
      const parsedChatHistory = chatHistory.chat[0].messages.map(
        ({ role, content, name }) => ({
          role,
          content,
          name,
        }),
      );
      //TODO: update to use the current session id
      const response = await chatStream({
        sessionId: chatHistory.chat[chatHistory.chat.length - 1].id,
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

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const decodedText = decoder.decode(value, { stream: true });
        resultText += decodedText;

        chatHistory.updateChat((prevChat) => {
          const newChat = [...prevChat];
          const lastSession = newChat[newChat.length - 1];

          const updatedMessages = [...lastSession.messages];
          if (
            updatedMessages[updatedMessages.length - 1]?.role === "assistant"
          ) {
            updatedMessages[updatedMessages.length - 1].content = resultText;
          } else {
            updatedMessages.push({
              role: "assistant",
              name: "Assistant",
              content: resultText,
            });
          }

          newChat[newChat.length - 1] = {
            ...lastSession,
            messages: updatedMessages,
          };

          return newChat;
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

        handleUpdate(content);
        setTimeout(() => handleSubmition(), 0);
        setTimeout(() => setContent(""), 0);
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
