"use client";

import { useState } from "react";
import { ChatContext, ChatSession, UpdateCurrentChat } from "./contexts";

interface ChatContextProp {
  children: React.ReactNode;
  chatHistory: ChatSession[];
}

export function ChatContextWrapper({ children, chatHistory }: ChatContextProp) {
  const [chat, setChat] = useState<ChatContextProp["chatHistory"]>(chatHistory);
  const [currentChat, setCurrentChat] = useState<number>(0);
  const updateCurrentChat = ({
    value,
    sessionIndex,
    messageIndex,
  }: UpdateCurrentChat) => {
    setChat((prevChat) => {
      const newChat = [...prevChat];
      const newSession = newChat[sessionIndex];
      const updatedMessages = [...newSession.messages];
      if (messageIndex) {
        if (messageIndex === "last") {
          updatedMessages[updatedMessages.length - 1] = value;
        } else if (typeof messageIndex === "number") {
          updatedMessages[messageIndex] = value;
        }
      } else {
        updatedMessages.push(value);
      }
      newChat[sessionIndex] = { ...newSession, messages: updatedMessages };

      return newChat;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        updateChat: setChat,
        setCurrentChat,
        currentChat,
        updateCurrentChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
