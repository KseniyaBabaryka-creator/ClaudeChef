import { HfInference } from '@huggingface/inference';

const SYSTEM_PROMPT = `
You are an AI assistant. The user will provide a list of ingredients they have, 
and you will generate a simple recipe they can make. 
You don't have to use all ingredients, but try to include as many as possible.
Return the recipe in markdown format.
`;

const API_KEY = import.meta.env.VITE_HF_API_KEY;

const hf = new HfInference(API_KEY);

export async function getRecipeFromMistral(ingredientsArr) {
	const ingredientsString = ingredientsArr.join(", ")
	try {
		 const response = await hf.chatCompletion({
			  model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
			  messages: [
					{ role: "system", content: SYSTEM_PROMPT },
					{ role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
			  ],
			  max_tokens: 1024,
		 })
		 return response.choices[0].message.content
	} catch (err) {
		 console.error(err.message)
	}
}
