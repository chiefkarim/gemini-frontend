"use server";
import prisma from "@/lib/db";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";

const BACKEND_URI = process.env.BACKEND_URI;
//TODO: REFACTOR authorization and getting the session and user id
//
export type ChatSessionWithMessages = Prisma.ChatSessionGetPayload<{
  include: { messages: true };
}>;

export async function updateChatSession(request: {
  id: string;
  title: string;
}): Promise<ChatSessionWithMessages | Response> {
  if (!BACKEND_URI && BACKEND_URI === undefined) {
    throw new Error("Please provide BACKEND_URI in environment variable!");
  }
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return new Response("User not found", {
      status: 401,
      statusText: "User not found",
    });
  }
  const userId = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });

  if (!userId || !userId.id) {
    return new Response("User not found", {
      status: 401,
      statusText: "User not found",
    });
  }
  const oldChatSession = await prisma.chatSession.findFirst({
    where: {
      id: request.id,
    },
  });
  if (oldChatSession?.userId !== userId.id) {
    return new Response("User not Authorized", {
      status: 401,
      statusText: "User not Authorized",
    });
  }
  const newChatSession = await prisma.chatSession.update({
    where: {
      id: request.id,
    },
    data: {
      title: request.title,
    },
    include: {
      messages: true,
    },
  });

  return newChatSession;
}
