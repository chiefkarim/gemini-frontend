"use client";

import { SessionProvider } from "next-auth/react";
import { ChatBox } from "./chat-box";
import { ChatContextWrapper } from "./chat-context-wrapper";
import { ChatInput } from "./chat-input";
import { SignOutBtn } from "./signout-btn";
import { Session } from "next-auth";
import { ChatSession } from "./contexts";
import { ChatSesssions } from "./chat-sessions";

interface ChatWrapperProps {
  chatHistory: ChatSession[];
  session: Session;
}

export function ChatWrapper({ session, chatHistory }: ChatWrapperProps) {
  return (
    <SessionProvider session={session}>
      <div className="p-5">
        <img className="size-20 rounded-full" src={session.user?.image || ""} />
        <h1>{session.user?.name}</h1>
        <SignOutBtn />
      </div>
      <div className="flex  p-2">
        <ChatContextWrapper chatHistory={chatHistory}>
          <ChatSesssions />
          <div className="flex gap-2 items-center flex-1 flex-col rounded">
            <ChatBox />
            <ChatInput />
          </div>
        </ChatContextWrapper>
      </div>
    </SessionProvider>
  );
}
