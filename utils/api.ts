import { Chat } from "@/components/contexts";

interface ChatStream {
  prompt: string;
  chatHistory: Chat[];
}
//TODO: refactor error handling
export const chatStream = async (data: ChatStream) => {
  try {
    const response = await fetch("http://localhost:8000/", {
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
