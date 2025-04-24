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

    // store the response when finished in mysql database

    return response;
  } catch (error) {
    console.error("api level", error);
    throw new Error("backend returned with error");
  }
}
