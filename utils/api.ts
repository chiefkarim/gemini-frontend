import { Chat } from "@/components/contexts";

interface ChatStream {
  prompt: string;
  chatHistory: Chat[];
}
//TODO: refactor error handling

const NEXT_PUBLIC_BACKEND_URI = process.env.BACKEND_URI;

if (!NEXT_PUBLIC_BACKEND_URI) {
  throw new Error("Please provide BACKEND_URI in environment variable!");
}

export const chatStream = async (data: ChatStream) => {
  try {
    const response = await fetch(NEXT_PUBLIC_BACKEND_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.prompt,
        chatHistory: [...data.chatHistory],
      }),
    });
    return response;
  } catch (error) {
    console.error("api level", error);
    throw new Error("backend returned with error");
  }
};
