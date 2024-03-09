// server.js

const express = require('express');
const { CohereClient } = require('cohere-ai');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const cohere = new CohereClient({
  token: "hNJtCITvyk0m6zkguAXyH4zpNRGVmHUv50sEXbRc",
});

app.post('/generate-trends', async (req, res) => {
  try {
    const prompt = "Predict the latest runway fashion trends for the 2024 season.";
    const generateResponse = await cohere.generate({
      prompt: prompt,
    });
    console.log(generateResponse)
    res.json(generateResponse);
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
