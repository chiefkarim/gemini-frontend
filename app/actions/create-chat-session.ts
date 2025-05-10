"use server";

import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

const BACKEND_URI = process.env.BACKEND_URI;

export type ChatSessionWithMessages = Prisma.ChatSessionGetPayload<{
  include: { messages: true };
}>;

export async function createChatSession(): Promise<ChatSessionWithMessages> {
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

  const newChatSession = await prisma.chatSession.create({
    data: {
      userId: user.id,
    },
    include: {
      messages: true,
    },
  });

  return newChatSession;
}
