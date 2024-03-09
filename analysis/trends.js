import fetch from 'node-fetch';

const cohereApiKey = 'YOUR_API_KEY'; // Replace with your actual Cohere API key
const cohereUrl = 'https://api.cohere.ai/v1/generate';

const prompt = `Predict the latest runway fashion trends for the 2024 season, including the percentage increase in popularity, specific clothing articles, colors, and the duration of their popularity.`;

async function generateFashionTrends() {
  const response = await fetch(cohereUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${cohereApiKey}`,
      'X-Client-Name': 'YOUR_PROJECT_NAME' // Replace with your project name
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.75,
      k: 0,
      p: 0.75,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop_sequences: ["\n"],
      model: 'command', // or another model that you prefer
      num_generations: 1
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  console.log('Generated Fashion Trends:', data.generations[0].text);
}

generateFashionTrends()
  .then(() => console.log('Trends generation complete'))
  .catch((error) => console.error('Failed to generate trends:', error));
