import { ChatWrapper } from "@/components/chat-wrapper";
import { ChatSession } from "@/components/contexts";
import { SignInBtn } from "@/components/login-btn";
import prisma from "@/lib/db";
import { getConversations } from "@/utils/getConversations";
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
          id: true,
        },
      });
      //TODO: REFACTOR error handleing
      if (!user) {
        throw new Error("User not found");
      }
      userId = user.id;
    }

    let chatHistory: ChatSession[] = [];
    if (userId) {
      const chatSessions = await getConversations({ userId });
      if (chatSessions) {
        console.log("chat sessions ", chatSessions[0]);
        chatHistory = chatSessions;
      }
    }

    console.log("chat message ", chatHistory);
    return <ChatWrapper chatHistory={chatHistory} session={session} />;
  } else {
    return (
      <div className="flex items-center w-screen h-screen justify-center content-center">
        <SignInBtn />
      </div>
    );
  }
}
