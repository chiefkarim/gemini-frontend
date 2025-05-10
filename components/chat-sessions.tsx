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
          <div
            className={
              "p-2 flex  justify-between" +
              (index === currentChat ? " bg-gray-200" : "")
            }
            key={item.id}
          >
            <p
              className="text-gray-950 cursor-default hover:cursor-pointer"
              onClick={() => setCurrentChat(index)}
            >
              {item.title}
            </p>
            {/* TODO: edit title funcionality */}
            <button className="text-gray-950 outline-1 ml-2 px-2 cursor-default hover:cursor-pointer">
              edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
