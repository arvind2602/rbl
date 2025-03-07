const Joi = require('joi');
const { pool } = require('../../config/db');
const { ChatGoogleGenerativeAI } = require('@langchain/google-genai');

const llm = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-pro",
    temperature: 0,
    maxRetries: 2,
    // other params...
});


const aiMsg = await llm.invoke([
    [
        "system",
        "You are a helpful assistant that translates English to French. Translate the user sentence.",
    ],
    ["human", "I love programming."],
]);
aiMsg;