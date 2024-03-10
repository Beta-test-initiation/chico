// server.js

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

app.post('/generate-trends', async (req, res) => {
  try {
    const prompt = "give me 15 latest runway trends for the 2024 season, can you also give a precentage of how that trend has increased, which particular clothing articles, colors are popular as well as for how long they have been popular for. ";
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
