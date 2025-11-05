import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export async function chatGemini(
  messages: Message[],
  model = "gemini-2.5-flash"
): Promise<string> {
  const modelInstance = genAI.getGenerativeModel({ model });

  const history = messages
    .slice(0, -1)
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const chat = modelInstance.startChat({ history });
  const result = await chat.sendMessage(messages[messages.length - 1].content);
  const response = await result.response;
  if (!response.text()) throw new Error("No response");
  return response.text();
}
