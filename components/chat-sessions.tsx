"use client";

import { useContext } from "react";
import { ChatContext } from "./contexts";
import { ChatSesssionsToolBar } from "./chat-side-toolbar";

export function ChatSesssions() {
  const { chat, currentChat, setCurrentChat } = useContext(ChatContext);
  return (
    <div className="w-fit flex flex-col max-w-sm sm:max-w-sm  p-2">
      <ChatSesssionsToolBar />

      <div className="outline-1 h-full">
        {chat.map((item, index) => (
          <div className="p-2 flex">
            <p onClick={() => setCurrentChat(index)} key={item.title}>
              {item.title}
            </p>
            {/* TODO: edit title funcionality */}
            <button className="pl-1 hover:cursor-pointer">edit</button>
          </div>
        ))}
      </div>
    </div>
  );
}
