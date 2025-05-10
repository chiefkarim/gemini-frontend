"use server";

import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { use } from "react";

const BACKEND_URI = process.env.BACKEND_URI;

export async function deleteChatSession(request: { id: string }) {
  if (!BACKEND_URI) {
    throw new Error("Missing BACKEND_URI environment variable");
  }

  const session = await getServerSession();

  if (!session?.user?.email) {
    throw new Error("Unauthorized: No user session found");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!user?.id) {
    throw new Error("User not found");
  }

  const chatSession = await prisma.chatSession.findUnique({
    where: {
      id: request.id,
    },
  });

  if (!chatSession) {
    throw new Error("Chat session not found");
  }

  if (chatSession.userId !== user.id) {
    throw new Error("Forbidden: You do not own this chat session");
  }
  await prisma.chatSession.delete({
    where: {
      id: request.id,
    },
  });

  return { success: true, message: "Chat session deleted" };
}
