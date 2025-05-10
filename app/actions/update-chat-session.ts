"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

const BACKEND_URI = process.env.BACKEND_URI;

export type ChatSessionWithMessages = Prisma.ChatSessionGetPayload<{
  include: { messages: true };
}>;

export async function updateChatSession(request: {
  id: string;
  title: string;
}): Promise<ChatSessionWithMessages> {
  if (!BACKEND_URI) {
    throw new Error("Missing BACKEND_URI environment variable");
  }

  const session = await getServerSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized: No user session found");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });

  if (!user?.id) {
    throw new Error("User not found");
  }

  const oldChatSession = await prisma.chatSession.findUnique({
    where: { id: request.id },
  });

  if (!oldChatSession) {
    throw new Error("Chat session not found");
  }

  if (oldChatSession.userId !== user.id) {
    throw new Error("Forbidden: You do not own this chat session");
  }

  const newChatSession = await prisma.chatSession.update({
    where: { id: request.id },
    data: { title: request.title },
    include: { messages: true },
  });

  return newChatSession;
}
