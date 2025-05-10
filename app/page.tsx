import { ChatWrapper } from "@/components/chat-wrapper";
import { ChatSession } from "@/components/contexts";
import { SignInBtn } from "@/components/login-btn";
import prisma from "@/lib/db";
import { getConversations } from "@/utils/getConversations";

import { getServerSession } from "next-auth";
import { createChatSession } from "./actions/create-chat-session";
import { ChatSessionWithMessages } from "./actions/update-chat-session";
// get chat session and pass it to chat wrapper
export default async function Home() {
  const session = await getServerSession();

  //TODO: abstract the code and refactor
  if (session) {
    let userId;
    if (session.user && session.user.email) {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
          select: {
            id: true,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        userId = user.id;
      } catch (error) {
        console.error(
          "Erreur de connexion à la base ou utilisateur introuvable :",
          error,
        );
        return (
          <div className="text-red-500">
            Une erreur est survenue. Veuillez réessayer plus tard.
          </div>
        );
      }
      let chatHistory: ChatSession[] = [];
      if (userId) {
        const chatSessions = await getConversations({ userId });
        //create new chat session if non exists
        if (chatSessions.length === 0) {
          const firstChat = await createChatSession();
          if (session instanceof Response) {
            throw new Error(session.statusText);
          } else {
            chatHistory.push(firstChat as ChatSessionWithMessages);
          }
        } else if (chatSessions) {
          chatHistory = chatSessions;
        }
      }

      return <ChatWrapper chatHistory={chatHistory} session={session} />;
    }
  } else {
    return (
      <div className="flex items-center w-screen h-screen justify-center content-center">
        <SignInBtn />
      </div>
    );
  }
}
