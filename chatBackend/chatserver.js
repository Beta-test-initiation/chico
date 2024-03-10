const express = require('express');
const { CohereClient } = require('cohere-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const cohere = new CohereClient({
    token: "DHaqdHYsakzTGsjNcNXtN9S6f3mkJVhER4vC6vrF",
});

app.post('/chat', async (req, res) => {
    try {
        // Extract user input from request body
        const userInput = req.body.message;
        // const engineeredPrompt = `answer this in less than 3 sentences: "${userInput}"`;

        const chatHistory = [
            { role: "USER", message: userInput } // Current user message
        ];

        const chatStream = await cohere.chatStream({
            chatHistory: chatHistory,
            preamble: "keep the response short",
            connectors: [{ id: "web-search" }],
        });

        const responseMessages = [];
        for await (const message of chatStream) {
            if (message.eventType === "text-generation") {
                responseMessages.push(message.message);
            }
        }

        res.json(responseMessages);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});