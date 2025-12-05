import { GoogleGenAI } from "@google/genai";
import { SCHOOL_NAME, CONTACT_EMAIL } from '../constants';

// Initialize the API client. 
// Note: We use process.env.API_KEY as strictly instructed.
// In a real production build, this would be injected at build time or runtime env.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are the intelligent virtual assistant for ${SCHOOL_NAME}.
Your goal is to help parents, students, and visitors with information about the school.

Key Information:
- Name: ${SCHOOL_NAME}
- Contact: ${CONTACT_EMAIL}
- Values: Integrity, Excellence, Community.
- Grades: K-12.
- Curriculum: CBCE & International Baccalaureate.
- Admissions: Open for 2024-2025 academic year.

Tone: Professional, warm, welcoming, and concise.
If you don't know an answer, politely suggest contacting the administration at ${CONTACT_EMAIL}.
Do not make up fake specific events or dates not provided in the context.
`;

export const generateAIResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, my AI brain is currently offline (Missing API Key). Please contact the school office directly.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });
    
    return response.text || "I apologize, I couldn't generate a response at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the school's information database. Please try again later.";
  }
};
