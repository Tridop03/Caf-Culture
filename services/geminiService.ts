
import { GoogleGenAI, Type } from "@google/genai";

// Ensure we only initialize if we have an environment context
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDrinkRecommendation = async (preferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a world-class barista. Based on these customer preferences: "${preferences}", suggest a specific drink from our artisan menu (Lavender Oat Latte, Cold Brew, Matcha, Maple Spice Latte). Return a brief, enthusiastic recommendation in 1-2 sentences.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I recommend our Signature Cold Brew for a smooth, refreshing boost!";
  }
};

export const moderatePost = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Moderation task: Is this cafe community board post appropriate? "${content}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            safe: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ["safe", "reason"]
        }
      }
    });
    return JSON.parse(response.text.trim());
  } catch (error) {
    return { safe: true, reason: "Unable to verify" };
  }
};
