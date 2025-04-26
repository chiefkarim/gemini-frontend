import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

const BACKEND_URI = process.env.BACKEND_URI;
//make sure useer is authed
//do any sanitazation
export async function POST(request: Request) {
  if (!BACKEND_URI && BACKEND_URI === undefined) {
    throw new Error("Please provide BACKEND_URI in environment variable!");
  }
  const data = await request.json();
  const session = await getServerSession();

  //TODO: abstract the code and refactor
  if (!session || !session.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }
  //TODO: can we combine the fetch request for user id with the check for session existence in one prisma call?
  const userId = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
    },
  });
  //TODO: REFACTOR error handleing

  // if not return unauthorized
  if (!userId) {
    return new Response("User not found", { status: 401 });
  }
  // check if the Chatsessionid exists in this user account
  const { name, sessionId, prompt, chatHistory } = data;
  const chatSession = await prisma.chatSession.findUnique({
    where: {
      id: sessionId,
    },
  });

  if (chatSession?.userId !== userId.id) {
    return new Response("No chat session was found for this user", {
      status: 404,
    });
  }
  // add the user prompt to the database
  const userMessage = await prisma.chatMessage.create({
    data: {
      role: "user",
      content: prompt,
      name: name || "User",
      sessionId,
    },
  });

  try {
    const response = await fetch(BACKEND_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.prompt,
        chatHistory: [...chatHistory],
      }),
    });
    // destructure the resposne
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body?.getReader();
    let assistantMessage = "";
    async function pump() {
      if (!reader) {
        writer.close();
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        assistantMessage += chunk;
        await writer.write(value);
      }

      writer.close();

      // Sauvegarder la réponse dans la base
      //TODO: catch errors
      const stored = await prisma.chatMessage.create({
        data: {
          role: "assistant",
          content: assistantMessage,
          name: "Assistant",
          sessionId,
        },
      });
    }

    pump(); // store the response when finished in mysql database
    return new Response(readable, {
      status: response.status,
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("api level", error);
    throw new Error("backend returned with error");
  }
}
