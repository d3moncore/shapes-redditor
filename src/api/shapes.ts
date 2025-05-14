import OpenAI from "openai";

const shapes_client = new OpenAI({
  apiKey: import.meta.env.VITE_SHAPESINC_API_KEY,
  baseURL: "https://api.shapes.inc/v1/",
  dangerouslyAllowBrowser: true
});

export async function getAIResponse(message: string) {
  const su = import.meta.env.VITE_SHAPESINC_SHAPE_USERNAME;
  
  const response = await shapes_client.chat.completions.create({
    model: `shapesinc/${su}`,
    messages: [
      { role: "user", content: message }
    ]
  });

  return response.choices[0].message.content;
} 