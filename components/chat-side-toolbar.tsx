"use client";

import {
  ChatSessionWithMessages,
  createChatSession,
} from "@/app/actions/create-chat-session";
import { useContext } from "react";
import { ChatContext } from "./contexts";

export function ChatSesssionsToolBar() {
  const { updateChat, setCurrentChat, currentChat } = useContext(ChatContext);
  const handleCreateChatSession = async () => {
    try {
      const session = await createChatSession();
      if (session instanceof Response) {
        throw new Error(session.statusText);
      } else {
        updateChat((oldchat) => [
          session as ChatSessionWithMessages,
          ...oldchat,
        ]);
        setCurrentChat(0);
      }
    } catch (error) {
      console.error("session creation error" + error);
    }
  };
  return (
    <div className="w-full">
      <button
        className="p-2 hover:cursor-pointer"
        onClick={handleCreateChatSession}
      >
        new chat
      </button>
      {/* TODO: search in chat sessions  */}
    </div>
  );
}
