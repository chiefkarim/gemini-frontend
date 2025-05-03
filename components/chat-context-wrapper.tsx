"use client";

import { useState } from "react";
import { ChatContext, Chat } from "./contexts";

interface ChatContextProp {
  children: React.ReactNode;
  chatHistory: Chat[];
}

export function ChatContextWrapper({ children, chatHistory }: ChatContextProp) {
  const [chat, setChat] = useState<Chat[]>(chatHistory);

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
