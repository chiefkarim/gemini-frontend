"use client";

import { SessionProvider } from "next-auth/react";
import { ChatBox } from "@/components/chat-box";
import { ChatContextWrapper } from "@/components/chat-context-wrapper";
import { ChatInput } from "@/components/chat-input";
import { SignOutBtn } from "@/components/sign-out-button";
import { ChatSesssions } from "@/components/chat-sessions";
import { ChatSession } from "@/components/contexts";
import { Session } from "next-auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWrapperProps {
  chatHistory: ChatSession[];
  session: Session;
}

export function ChatWrapper({ session, chatHistory }: ChatWrapperProps) {
  return (
    <SessionProvider session={session}>
      <ChatContextWrapper chatHistory={chatHistory}>
        <div className="flex h-screen overflow-hidden">
          <aside className="w-[280px] border-r bg-background p-4 flex flex-col justify-between">
            <div className="space-y-4">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center gap-3">
                  <Avatar className="size-16">
                    <AvatarImage
                      src={session.user?.image || ""}
                      alt={session.user?.name || "User"}
                    />
                    <AvatarFallback>
                      {session.user?.name?.[0]?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-center text-lg font-semibold">
                    {session.user?.name}
                  </h1>
                </CardContent>
              </Card>

              <ScrollArea className="h-[60vh] pr-2">
                <ChatSesssions />
              </ScrollArea>
            </div>

            <div className="mt-4">
              <SignOutBtn />
            </div>
          </aside>

          <main className="flex-1 flex flex-col bg-muted p-4">
            <div className="flex-1 overflow-y-auto mb-2">
              <ChatBox />
            </div>
            <div className="border-t pt-2">
              <ChatInput />
            </div>
          </main>
        </div>
      </ChatContextWrapper>
    </SessionProvider>
  );
}
