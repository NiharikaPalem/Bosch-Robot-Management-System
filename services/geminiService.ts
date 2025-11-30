import { GoogleGenAI } from "@google/genai";
import { LogEntry, RobotState } from "../types";

const API_KEY = process.env.API_KEY || '';

export const analyzeSystemLogs = async (logs: LogEntry[], currentState: RobotState): Promise<string> => {
    if (!API_KEY) {
        return "API Key not configured. AI Analysis unavailable.";
    }

    try {
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        
        // Prepare context
        const recentLogs = logs.slice(-20).map(l => `[${l.timestamp}] ${l.message}`).join('\n');
        const stateSummary = `
            Target Speed: ${currentState.targetSpeed} m/s
            Actual Speed: ${currentState.speed.toFixed(2)} m/s
            Battery: ${currentState.battery.toFixed(1)}%
            Steps: ${currentState.steps}
            Direction: ${currentState.direction}
            Fallen Status: ${currentState.isFallen ? 'YES' : 'NO'}
            Cargo Status: ${currentState.hasBox ? 'Carrying Box' : 'No Box'}
        `;

        const userQuery = `Analyze the following system logs and current robot status:\n\n--- Logs ---\n${recentLogs}\n\n--- Current State ---\n${stateSummary}`;
        
        const systemPrompt = "You are the Bosch Robot Diagnosis Expert. Analyze the provided system logs and current robot state. Provide a concise, single-paragraph summary of any issues found (even minor ones) and give one specific, actionable recommendation to improve performance or address a concern. Start with 'Diagnosis:'";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userQuery,
            config: {
                systemInstruction: systemPrompt,
            }
        });

        return response.text || "No analysis generated.";

    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error: Could not retrieve AI diagnosis. Check console for details.";
    }
};
