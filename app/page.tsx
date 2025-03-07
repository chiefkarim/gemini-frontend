import { ChatWrapper } from "@/components/chat-wrapper";
import { SignInBtn } from "@/components/login-btn";
import { getServerSession } from "next-auth";

//TODO: add chat bot interface
//TODO: add tailwind calsses formating
//TODO: replace components with shad-cn components
//TODO: type pageProps

export default async function Home() {
  const session = await getServerSession();
  if (session) {
    return <ChatWrapper session={session} />;
  } else {
    return (
      <div className="flex items-center w-screen h-screen justify-center content-center ">
        <SignInBtn />
      </div>
    );
  }
}
