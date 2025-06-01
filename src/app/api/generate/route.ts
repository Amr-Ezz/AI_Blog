import { NextResponse } from "next/server";
import OpenAI, { OpenAIError } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt } = body;
    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "user", content: `generate a blog post about ${prompt}` },
      ],
      max_tokens: 500,
    });
    const generatedContent = completion.choices[0]?.message?.content?.trim();
    if (!generatedContent) {
      return NextResponse.json(
        { error: "Failed to generate content from OpenAI" },
        { status: 500 }
      );
    }
    return NextResponse.json({ content: generatedContent });
  } catch (error) {
    console.error("Error calling openai:", error);
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API Error: ${error.status} ${error.message}` },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
