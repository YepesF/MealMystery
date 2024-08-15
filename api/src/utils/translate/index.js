import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

const apiKeys = process.env.GEMINI_API_KEY.split(",");

const generationConfig = {
  temperature: 1.15,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

// Utility function to add a delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const translate = async (recipe, indexApi) => {
  await sleep(6000); // 6 seconds delay
  const genAI = new GoogleGenerativeAI(apiKeys[indexApi]);
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
    safetySettings,
  });

  const prompt = `
    **Title:** ${recipe.title}
    **Summary:** ${recipe.summary}
    **Steps:** ${JSON.stringify(recipe.steps)}

    Detect the language and translate this information into English and Spanish using this JSON schema, making sure that all html tags are persisted in summary:

    {
      "type": "object",
      "properties": {
        "titleEs": { "type": "string" },
        "summaryEs": { "type": "string" },
        "steps": { 
          "type": "array"
          "items": {
            "type": "object",
            "properties": {
              "number": { "type": "number"},
              "en": { "type": "string" },
              "es": { "type": "string" }
            }
          }
        }
      }
    }
  `;

  return await model.generateContent(prompt)
    .then(({ response }) => JSON.parse(response.text()))
    .catch(() => recipe)
    .finally(() => recipe);
};
