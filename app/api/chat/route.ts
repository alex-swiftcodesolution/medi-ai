import { chatGemini, Message } from "@/lib/gemini";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { messages }: { messages: Message[] } = await req.json();
  const response = await chatGemini(messages);
  return Response.json({ response });
}
