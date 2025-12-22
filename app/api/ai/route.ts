import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Empty message" });
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant for a realtime bracket syntax validator. Explain stack-based validation, mismatched brackets, and error fixing clearly.",
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("GROQ RAW RESPONSE 👉", data);

    return NextResponse.json({
      reply:
        data?.choices?.[0]?.message?.content ||
        "Groq returned no content",
    });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { reply: "AI service error" },
      { status: 500 }
    );
  }
}
