import { GoogleGenAI } from "@google/genai";

// Safely access process.env to prevent "process is not defined" crashes in browser-only environments
const getApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env) {
      return process.env.API_KEY || '';
    }
  } catch (e) {
    // Ignore error if process is not available
  }
  return '';
};

const API_KEY = getApiKey();

// Fallback response if no API key is present or error occurs
const FALLBACK_RESPONSES = [
  "¡Saludos mi gente! Gracias por sintonizar La Perla Radio.",
  "¡Ese tema está durísimo! 🔥",
  "Aquí seguimos activos 24/7 con el mejor flow.",
  "Saludos a todo el barrio que nos escucha.",
  "La Perla Radio en la casa. ¡Pidan sus temas!"
];

export const generateDJResponse = async (userMessage: string, history: string[]): Promise<string> => {
  if (!API_KEY) {
    console.warn("Gemini API Key missing or process.env unavailable. Using fallback response.");
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }

  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    
    // Construct a context-aware prompt
    const systemInstruction = `
      Eres "DJ Perla", el host virtual de "La Perla Radio", una estación de música urbana, reggaetón, trap y hip-hop.
      Tu personalidad es callejera, moderna, enérgica y profesional ("flow urbano").
      Responde a los mensajes de los oyentes en el chat en vivo.
      Mantén las respuestas cortas (máximo 2 frases).
      Usa jerga urbana latina apropiada (sin ser ofensivo).
      Usa emojis.
      Si piden una canción, di que la pondrás en cola.
    `;

    const model = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: model,
      contents: `Historial de chat reciente:\n${history.join('\n')}\n\nUsuario dice: "${userMessage}"\n\nResponde como DJ Perla:`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.8,
        maxOutputTokens: 60,
      }
    });

    return response.text || "¡Estamos en vivo!";
  } catch (error) {
    console.error("Error generating DJ response:", error);
    return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
  }
};