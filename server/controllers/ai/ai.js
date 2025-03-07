const Joi = require('joi');
const { pool } = require('../../config/db');
const dotenv = require('dotenv');
const { Pinecone } = require('@pinecone-database/pinecone');
const { GoogleGenerativeAIEmbeddings } = require('@langchain/google-genai');

dotenv.config();

// Initialize Pinecone client
const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
});
const INDEX_NAME = 'rbl-sdnohw2';

const getAi = async (req, res) => {
    try {
        const { question, user_uuid } = req.body;

        // Validate input
        const schema = Joi.object({
            question: Joi.string().required(),
            user_uuid: Joi.string().required()
        });
        await schema.validateAsync({ question, user_uuid });

        // Initialize index
        const index = pinecone.index(INDEX_NAME);

        // Check if index exists, create if not
        const indexesResponse = await pinecone.listIndexes();
        console.log('Existing Indexes:', indexesResponse);
        const existingIndexes = indexesResponse.indexes || [];
        const indexExists = existingIndexes.some(index =>
            typeof index === 'string' ? index === INDEX_NAME : index.name === INDEX_NAME
        );

        if (!indexExists) {
            console.log(`Creating index: ${INDEX_NAME}`);
            await pinecone.createIndex({
                name: INDEX_NAME,
                dimension: 768,
                metric: 'cosine',
                spec: {
                    serverless: {
                        cloud: 'aws',
                        region: 'us-east-1'
                    }
                }
            });
            // Wait for the index to be ready (adjust delay as needed)
            await new Promise(resolve => setTimeout(resolve, 5000)); // 5-second delay
            console.log(`Index ${INDEX_NAME} created successfully`);
        }

        // Initialize Google AI and Embeddings
        const { ChatGoogleGenerativeAI } = await import('@langchain/google-genai');
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
            model: "embedding-001"
        });

        // Get previous conversations
        let conversationHistory = [];
        const questionEmbedding = await embeddings.embedQuery(question);
        const queryResponse = await index.namespace(`user_${user_uuid}`).query({
            vector: questionEmbedding,
            topK: 10,
            includeValues: true,
            includeMetadata: true
        });

        // Process conversation history (assuming this part was in your original code)
        if (queryResponse.matches.length > 0) {
            conversationHistory = queryResponse.matches.map(match => match.metadata);
        }

        // Initialize Chat model (example implementation)
        const chat = new ChatGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
            model: "gemini-1.5-pro"
        });

        // Generate response (example logic)
        const aiResponse = await chat.invoke([
            ["system", "You are a helpful AI assistant."],
            ["human", question]
        ]);
        const responseEmbedding = await embeddings.embedQuery(aiResponse.content);

        // Upsert question and response to Pinecone
        await index.namespace(`user_${user_uuid}`).upsert([
            {
                id: `${user_uuid}_${Date.now()}_q`,
                values: questionEmbedding,
                metadata: {
                    type: 'question',
                    content: question,
                    timestamp: Date.now()
                }
            },
            {
                id: `${user_uuid}_${Date.now()}_r`,
                values: responseEmbedding,
                metadata: {
                    type: 'response',
                    content: aiResponse.content,
                    timestamp: Date.now()
                }
            }
        ]);

        return res.json({ content: aiResponse.content });
    } catch (error) {
        console.error("Error Details:", error.stack);
        return res.status(500).json({ error: 'Server error', details: error.message });
    }
};

// Updated clearConversation function
const clearConversation = async (user_uuid) => {
    try {
        const index = pinecone.index(INDEX_NAME);
        await index.namespace(`user_${user_uuid}`).deleteAll();
        console.log(`Conversation cleared for user_${user_uuid}`);
        return true;
    } catch (error) {
        console.error('Error clearing conversation:', error.stack);
        return false;
    }
};



// Generate report for user based on conversation history
const generateReport = async (req, res) => {
    const { user_uuid } = req.body;
    try {
        const index = pinecone.index(INDEX_NAME);

        // Initialize embeddings to create a generic query vector
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
            model: "embedding-001"
        });

        // Create a generic query vector to retrieve conversation history
        const genericQuery = "Summarize my recent interactions";
        const queryEmbedding = await embeddings.embedQuery(genericQuery);

        // Query Pinecone with the generic vector
        const queryResponse = await index.namespace(`user_${user_uuid}`).query({
            vector: queryEmbedding, // Provide the required vector
            topK: 100,
            includeValues: true,
            includeMetadata: true
        });

        // Extract conversation history from the query response
        const conversationHistory = queryResponse.matches.map(match => match.metadata);

        // Initialize the chat model
        const { ChatGoogleGenerativeAI } = await import('@langchain/google-genai');
        const chat = new ChatGoogleGenerativeAI({
            apiKey: process.env.GOOGLE_GENAI_API_KEY,
            model: "gemini-1.5-pro"
        });

        // Generate a summary based on the conversation history
        const aiResponse = await chat.invoke([
            [
                "system",
                `You are a helpful AI assistant. Based on the conversation history: ${JSON.stringify(conversationHistory)}, provide a summary of the user's recent interactions.`
            ],
            ["human", "Please summarize my recent interactions."]
        ]);

        // Return the response to the client
        return res.json({ content: aiResponse.content });
    } catch (error) {
        console.error('Error generating report:', error.stack);
        return res.status(500).json({ error: 'Failed to generate report', details: error.message });
    }
};

module.exports = { getAi, clearConversation, generateReport };