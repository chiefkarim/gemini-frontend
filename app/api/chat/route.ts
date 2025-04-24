import { NextResponse } from "next/server";

const BACKEND_URI = process.env.BACKEND_URI;

export async function POST(request: Request) {
  if (!BACKEND_URI && BACKEND_URI === undefined) {
    throw new Error("Please provide BACKEND_URI in environment variable!");
  }
  const data = await request.json();

  try {
    const response = await fetch(BACKEND_URI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: data.prompt,
        chatHistory: [...data.chatHistory],
      }),
    });
    // destructure the resposne
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const reader = response.body?.getReader();

    async function pump() {
      if (!reader) {
        writer.close();
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writer.write(value);
      }

      writer.close();
    }

    pump();
    // store the response when finished in mysql database
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
