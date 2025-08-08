import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
  throw new Error("GOOGLE_API_KEY not found in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiTextModel = genAI.getGenerativeModel({ model: "gemini-pro" });
export const geminiVisionModel = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
