"use client";

import { FormEvent, useContext, useState } from "react";
import { ChatContext } from "./contexts";
import { chatStream } from "@/utils/api";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
      const parsedChatHistory = chat[currentChat].messages.map(
        ({ role, content, name }) => ({
          role,
          content,
          name,
        }),
      );
      const response = await chatStream({
        sessionId: chat[currentChat].id,
        prompt: content,
        chatHistory: parsedChatHistory,
        name: "User",
      });

      if (response.ok) {
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
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        handleSubmition();
      }}
      className="flex w-full max-w-sm sm:max-w-xl md:max-w-6xl gap-2 py-1"
    >
      <Input
        className="flex-1"
        placeholder="Write a prompt..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" className="whitespace-nowrap">
        Submit
      </Button>
    </form>
  );
}
