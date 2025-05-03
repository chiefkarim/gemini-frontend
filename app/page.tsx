import { ChatWrapper } from "@/components/chat-wrapper";
import { Chat } from "@/components/contexts";
import { SignInBtn } from "@/components/login-btn";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
// get chat session and pass it to chat wrapper
export default async function Home() {
  const session = await getServerSession();

  //TODO: abstract the code and refactor
  if (session) {
    let userId;
    if (session.user && session.user.email) {
      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true, // Only select the 'id' field
        },
      });
      //TODO: REFACTOR error handleing
      if (!user) {
        throw new Error("User not found");
      }

      userId = user.id;
    }

    const result = await prisma.chatSession.findFirst({
      where: {
        userId: userId, // Remplace par l'ID de l'utilisateur
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        messages: true, // facultatif : pour inclure les messages de la session
      },
    });
    let chatHistory: Chat[] = [];
    if (result && result.messages !== null) {
      //fetch the chat history from the database
      chatHistory = result["messages"];
    }
    return <ChatWrapper chatHistory={chatHistory} session={session} />;
  } else {
    return (
      <div className="flex items-center w-screen h-screen justify-center content-center">
        <SignInBtn />
      </div>
    );
  }
}
