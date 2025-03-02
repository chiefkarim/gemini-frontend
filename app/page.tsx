"use client";

import { ChatBox } from "@/components/chat-box";
import { ChatContextWrapper } from "@/components/chat-context-wrapper";
import { ChatInput } from "@/components/chat-input";

//TODO: add chat bot interface
//TODO: add tailwind calsses formating
//TODO: replace components with shad-cn components

export default function Home() {
  return (
    <div className="flex h-screen w-screen justify-center content-center flex-wrap">
      <ChatContextWrapper>
        <div className="flex gap-2 flex-col rounded">
          <ChatBox />
          <ChatInput />
        </div>
      </ChatContextWrapper>
    </div>
  );
}
