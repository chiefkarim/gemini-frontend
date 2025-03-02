"use client";

import { useEffect, useState } from "react";
import { ChatContext, ChatType } from "./contexts";

export function ChatContextWrapper({ children }: any) {
  const [chat, setChat] = useState<ChatType["chat"]>([]);

  const [retry, setRetry] = useState<boolean>(false);
  useEffect(() => {
    const localChat = localStorage.getItem("chatHistory");
    setChat(() => (localChat ? JSON.parse(localChat) : []));
  }, []);

  useEffect(() => {
    const stringChat = JSON.stringify(chat);
    localStorage.setItem("chatHistory", stringChat);
  }, [chat]);

  return (
    <ChatContext.Provider
      value={{ chat, updateChat: setChat, retry, setRetry }}
    >
      {children}
    </ChatContext.Provider>
  );
}
