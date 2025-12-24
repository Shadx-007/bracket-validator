import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({
        reply: "Please enter a valid question.",
      });
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
          model: "llama-3.1-8b-instant",
          temperature: 0.2,
          max_tokens: 180,
          messages: [
            {
              role: "system",
              content:
                "You are an AI assistant for a Realtime Bracket Syntax Validator.\n" +
                "Rules:\n" +
                "- Do not use markdown formatting\n" +
                "- Keep answers short and structured\n" +
                "- Use numbered steps only\n" +
                "- Maximum six lines\n" +
                "- No long paragraphs\n" +
                "Topics:\n" +
                "- Stack based bracket validation\n" +
                "- Mismatched, stray, unbalanced brackets\n" +
                "- Python, C, C++, Java explanations\n" +
                "- Error fixing guidance\n" +
                "Format:\n" +
                "Title:\n" +
                "Steps:\n" +
                "Example:",
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

    let reply =
      data?.choices?.[0]?.message?.content ||
      "No response from AI.";

    // Cleanup for UI safety
    reply = reply
      .replace(/\*\*/g, "")
      .replace(/###/g, "")
      .replace(/\n{2,}/g, "\n")
      .trim();

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json(
      { reply: "AI service error. Please try again." },
      { status: 500 }
    );
  }
}
