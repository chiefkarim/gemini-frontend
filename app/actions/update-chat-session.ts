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

export async function updateChatSession(
  request: Request,
): Promise<ChatSessionWithMessages | Response> {
  if (!BACKEND_URI && BACKEND_URI === undefined) {
    throw new Error("Please provide BACKEND_URI in environment variable!");
  }
  const session = await getServerSession();

  const data = await request.json();
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
  const newChatSession = await prisma.chatSession.update({
    where: {
      id: data.id,
    },
    data: {
      title: data.title,
    },
    include: {
      messages: true,
    },
  });

  return newChatSession;
}
