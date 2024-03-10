// server.js

const express = require('express');
const { CohereClient } = require('cohere-ai');
const cors = require('cors');
const math = require('mathjs');
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

function cosineSimilarity(vecA, vecB) {
  const dotProduct = math.dot(vecA, vecB);
  const normA = math.sqrt(math.dot(vecA, vecA));
  const normB = math.sqrt(math.dot(vecB, vecB));
  return dotProduct / (normA * normB);
}


app.post('/search-outfits', async (req, res) => {
  const { query } = req.body; // User's query for the outfit search

  try {
    // Step 1: Obtain embeddings for the user query
    const queryResponse = await cohere.embed({
      texts: [query],
      model: "large",
      input_type: "query",
    });

    // Step 2: You need to have a predefined list of outfit descriptions
    const outfits = [
      "For a casual yet chic look, pair wide-leg trousers in a neutral tone with a cropped cream-colored sweater and minimalist jewelry.",
      "Step out in a sleek asymmetrical neckline black dress adorned with statement gold jewelry and contrasted with a embroidered leather jacket.",
      "Try a refined ensemble featuring a subdued monotone checkered print blazer and pant set paired with a classic white shirt and pointed pumps.",
      "Channel a casual vibe with high-rise loose jeans teamed with a graphic tank top adorned with a embroidered denim jacket and finished with croc-embossed mules.",
      "Create a bold look with a graphic black and white ruched bodycon dress accented with statement metallic earrings and topped with a sleek blazer.",
      "Exude elegance in a white tailored pantsuit complemented with a statement necklace and finished with a contrasting colored bag.",
      "A tailored silk gown with intricate embroidery and diamante jewelry is perfect for a red carpet moment.",
      "Channel a sporty yet chic ensemble with a mesh varsity sweater paired with relaxed jeans and layered with a tailored coat.",
      "Create a playful look with an oversized blazer and shorts co-ord set matched with a graphic shirt and loafers.",
      "A tailored leather ensemble featuring a leather skirt and jacket paired with a silk blouse is a perfect look for a night out.",
      "For a casual yet stylish look, pair trousers in a bold color with a relaxed linen shirt and finish the look with heeled sandals.",
      "Step out in a ruched strapless maxi dress adorned with a statement necklace and complemented with a sleek blazer.",
      "A tailored pant and vest set paired with a corset belt and finished with pointed-toe pumps is a perfect look for business attire.",
      "For a casual yet put-together look, pair a polo shirt with high-waisted wide-leg jeans and ballet flats.",
      "A asymmetrical neckline dress adorned with dainty jewelry and finished with a cropped leather jacket is perfect for a casual yet chic look.",
      "Exude sophistication in a tailored white pantsuit paired with a black tank and finished with statement jewelry and shoes.",
      "A sleek black leather pants and cropped jacket set paired with an oversized sweater is perfect for a chic yet casual look.",
      "A floor-length gown with intricate beadwork and a statement necklace is a perfect outfit for a glamorous evening.",
      "Create a playful look with a colorful oversized sweater paired with relaxed jeans and finished with a coordinated checkerboard hat, earrings, and shoes.",
      "A tailored silk gown with a asymmetric neckline and long sleeves adorned with statement earrings is perfect for a refined yet glamorous look.",
      "Step out in a bold look with a floor-length dress adorned with a colorful floral pattern and finished with a sleek blazer.",
      "A sleek bodycon midi dress adorned with a statement necklace and complemented with a cropped leather jacket is perfect for a night out.",
      "Channel a casual vibe with high-waisted wide-leg jeans and a graphic tank topped with an eco-leather moto jacket and finished with croc-embossed mules.",
      "A floor-length gown with a daring neckline and statement diamante earrings is a perfect outfit for a red carpet moment.",
      "A ruched bodice gown with a feminine silhouette and embellished straps is a perfect outfit for a romantic evening.",
      "A bold orange one-shoulder neckline bodycon dress accented with statement gold jewelry is perfect for a bold yet refined look.",
      "For a casual yet stylish look, pair wide-leg trousers in a playful print with a relaxed linen shirt and finish the look with heeled sandals.",
      "Step out in a sleek asymmetrical neckline black dress adorned with statement jewelry and contrasted with a embroidered leather jacket.",
      "Try a refined ensemble featuring a muted monotone checkered print blazer and pantset paired with a classic white shirt and pointed pumps.",
      "Channel a casual vibe with high-rise loose jeans teamed with a graphic tank top adorned with a embroidered denim jacket and finished with croc-embossed mules."
    ];
    
    // Step 3: Obtain embeddings for your outfit descriptions
    const outfitsResponse = await cohere.embed({
      texts: outfits,
      model: "large",
      input_type: "document",
    });

    // Step 4: Implement the logic to find the best matching outfit
    // This part of the code is simplified; you'll need to implement similarity calculation
    // For demonstration, let's assume the first outfit is the best match
    const queryEmbedding = queryResponse.embeddings[0];
    const outfitEmbeddings = outfitsResponse.embeddings;

    // Calculate similarity scores between the query and each outfit
    const similarityScores = outfitEmbeddings.map((outfitEmbedding) => {
      return cosineSimilarity(queryEmbedding, outfitEmbedding);
    });

    // Find the index of the highest similarity score
    const bestMatchIndex = similarityScores.indexOf(Math.max(...similarityScores));

    // Suggest the best matching outfit
    const bestMatchOutfit = outfitsResponse.texts[bestMatchIndex];

    console.log('Best match outfit:', bestMatchOutfit);
    res.json({ bestMatchOutfit });

  } catch (error) {
    console.error('Error during outfit search:', error);
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
