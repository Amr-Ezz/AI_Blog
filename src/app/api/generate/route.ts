import { NextResponse } from "next/server";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.OPENAI_API_KEY;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o";

if (!token) {
  console.error("Github_Token env not set");
}
const client = ModelClient(
  endpoint,
  new AzureKeyCredential(token || "invalid_token")
);

export async function POST(req: Request) {
  if (!token) {
    return NextResponse.json(
      { error: "Server configuration error: GITHUB_TOKEN is missing." },
      { status: 500 }
    );
  }
  try {
    const body = await req.json();
    const { prompt } = body;
    if (!prompt) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    // const completion = await openai.chat.completions.create({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     { role: "user", content: `generate a blog post about ${prompt}` },
    //   ],
    //   max_tokens: 500,
    // });
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant generating blog posts",
          },
          {
            role: "user",
            content: `Generate a short blog post about ${prompt}`,
          },
        ],
        top_p: 1,
        model: model,
        max_tokens: 500,
      },
      contentType: "application/json",
    });
    if (isUnexpected(response)) {
      // Log the detailed error for server-side debugging
      console.error("Azure AI Inference Error:", response.body?.error);
      // Return a generic error to the client
      return NextResponse.json(
        {
          error: `AI Model Inference Error: ${response.status} ${
            response.body?.error?.message || "Failed to generate content"
          }`,
        },
        { status: parseInt(response.status) || 500 }
      );
    }
    const generatedContent =
      response.body.choices?.[0].message?.content?.trim();
    if (!generatedContent) {
      return NextResponse.json(
        { error: "Failed to generate content from OpenAI" },
        { status: 500 }
      );
    }
    return NextResponse.json({ content: generatedContent });
  } catch (error: any) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}
