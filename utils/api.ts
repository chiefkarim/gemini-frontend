import type { Chat } from "@/components/contexts";

interface ChatStream {
  prompt: string;
  chatHistory: Chat[];
  sessionId: string;
  name: string | "User";
}

//TODO: refactor error handling

export const chatStream = async (data: ChatStream) => {
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.prompt,
        chatHistory: [...data.chatHistory],
        sessionId: data.sessionId,
        name: data.name,
      }),
    });
    return response;
  } catch (error) {
    console.error("api level", error);
    throw new Error("backend returned with error");
  }
};
