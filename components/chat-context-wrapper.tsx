"use client";

import { useState } from "react";
import { ChatContext, ChatSession } from "./contexts";

interface ChatContextProp {
  children: React.ReactNode;
  chatHistory: ChatSession[];
}

export function ChatContextWrapper({ children, chatHistory }: ChatContextProp) {
  const [chat, setChat] = useState<ChatContextProp["chatHistory"]>(chatHistory);
  return (
    <ChatContext.Provider value={{ chat, updateChat: setChat }}>
      {children}
    </ChatContext.Provider>
  );
}
