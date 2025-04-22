"use client";

import { useEffect, useState } from "react";
import { ChatContext, ChatType } from "./contexts";

export function ChatContextWrapper({ children }: any) {
  const [chat, setChat] = useState<ChatType["chat"]>([]);

  // sets chat history to localstorage
  useEffect(() => {
    const localChat = localStorage.getItem("chatHistory");
    setChat(() => (localChat ? JSON.parse(localChat) : []));
  }, []);

  // gets chat history from localstorage
  useEffect(() => {
    const stringChat = JSON.stringify(chat);
    localStorage.setItem("chatHistory", stringChat);
  }, [chat]);

  return (
    <ChatContext.Provider value={{ chat, updateChat: setChat }}>
      {children}
    </ChatContext.Provider>
  );
}
