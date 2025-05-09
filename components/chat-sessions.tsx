"use client";

import { useContext } from "react";
import { ChatContext } from "./contexts";
import { ChatSesssionsToolBar } from "./chat-side-toolbar";

export function ChatSesssions() {
  const { chat, currentChat, setCurrentChat } = useContext(ChatContext);
  return (
    <div className="w-fit flex flex-col max-w-xs sm:max-w-sm  p-2">
      <ChatSesssionsToolBar />

      <div className="outline-1 h-full">
        {chat.map((item, index) => (
          <p onClick={() => setCurrentChat(index)} key={item.title}>
            {item.title}
          </p>
        ))}
      </div>
    </div>
  );
}
