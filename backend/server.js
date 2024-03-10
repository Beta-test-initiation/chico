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
      "Spice Pop: A creamy ivory satin blouse with a vortex neckline is paired with a matte Spice Pop orange suede miniskirt and burnt coral spaghetti strap heels with an angular block heel design. A matte gold adjustable necklace with an orb-shaped pendant and matching golden hoop earrings complete this vibrant yet sophisticated ensemble.",
      "Celestial Coastal: For a whimsical coastal appeal, tuck a semi-sheer ivory shirt with shell buttons into a high-rise, wide-leg denim pant with a white paint-dripping effect. Accentuate this ensemble with a necklace featuring a brass pendant in the shape of a seashell and celestial-inspired gold stud earrings. Finish the look with sleek ivory slide sandals and a coordinating canvas tote bag.",
      "Urban Garden: A floral print satin maxi dress with a subtle grid pattern and contrasting collarbone-grazing neckline is perfect for garden parties. Keep it urban with metallic flower-shaped earrings, a statement necklace that resembles a tangled garden fence, and metallic square-toe leather sandals.",
      "Sustainable Edge: A boxy denim jacket with contrasting recycled denim panels and shredded sleeves is paired with a deconstructed knit cardigan in a soothing terracotta tone and wide-leg cream denim pants with frayed hem. Sustainable fashion accessories, like biodegradable resin statement earrings in a burnt sienna color, a necklace made from recycled fishing nets, and up-cycled rubber sneakers complete this edgy, environmentally conscious look.",
      "Opulent Eclectic: A lace blouse with an asymmetric neckline and pleated bodice is combined with a lavish wide-leather statement skirt in a dark ebony hue. Bring in an eclectic touch with jewelry, such as a necklace featuring a staggered cluster of antique pearls and statement drop earrings featuring beaded clusters and crystal pendants. Complete the look with black stiletto heels, adding a delicate lace ankle strap for further intrigue.",
      "Urban Safari: A collared shirt is styled unconventionally, left open and layered over a vivid sapphire cropped tank top. Team it with high-waist wide-leg cream linen pants and safari-inspired accessories, namely a matte brown wooden beaded necklace and angular brass hoop earrings. Complete the outfit with minimalist sandal heels and a contrasting chestnut mini purse.",
      "Soft Punk: A blush pink spaghetti strap dress with a contrasting black geometric neckline and scalloped hemline evokes a soft punk vibe. Accentuate it with a black leather jacket adorned with lace applique and contrasting black and silver jewelry, such as double hoop earrings and a choker with a black beaded center and silver tips. Finish the ensemble with black ankle booties featuring a lace-up detail and a black leather beret.",
      "Cottagecore Chic: A puff-sleeve embroidered blouse in a soft lavender hue is paired with a coordinating lavender gingham a-line mini skirt and black mesh ankle strap heels for a playful, feminine look. Delicate jewelry in coordinating colors completes the ensemble, including a lavender birthstone ring, small black hoop earrings, and a black and lavender beaded necklace.",
      "Dark Glamour: A vintage-inspired black lace bodysuit is styled underneath a black velvet blazer for a sophisticated and alluring look. Amp up the glamour with statement chandelier earrings and a coordinating black gemstone ring. Pair this outfit with black stiletto heels and a sleek cylinder purse for a dark and luxurious vibe.",
      "Soft Minimalism: A boxy double-breasted jacket with a subtle herringbone pattern is paired with an understated creamy suede shift dress. Keep the accessories minimal with a single gold hoop tucked behind the ears, a dainty gold necklace, and understated leather ballet flats.",
      "Cashmere Chic: A cropped cashmere sweater in a soothing sage tone is layered over a silky floral print slip dress for an unexpected textural combination. Continue the ethos with delicate gold jewelry and black leather booties.",
      "Urban Cowgirl: A structured cropped leather jacket is styled over a crochet floral blouse and high-rise distressed denim jeans. Cowgirl accents, including a braided leather bracelet, a cowboy-inspired belt with a statement buckle, and western-inspired ankle boots, elevate this look.",
      "Retro Futurism: A modish acrylic outerwear piece in a sci-fi-inspired shade of neon coral is worn over a black roll-neck top and slim-fit navy blue trousers. This futuristic look is complemented with coordinating chrome jewelry and pointed chrome pumps.",
      "Sustainable Sanctuary: A cozy knit cardigan with an earthy terracotta tone is draped over a lacy white blouse and beige paper bag waist pants for a cozy-chic ensemble. Keep it sustainable with biodegradable jewelry, such as a natural clay statement necklace and terra-cotta clay hoop earrings. Finished the look with woven wedge sandals and a delicate gold anklet.",
      "Urban Botanical: A sleeveless ribbed tank top in a bold mint green color is styled beneath a mesh floral blouse and left untucked with a pair of high-waist wide-leg pants in a darker emerald tone. Keep the outfit upbeat and playful with bubblegum pink heeled mules, pink-hued statement earrings, and a delicate pink bead necklace.",
      "Luxe Feminine: A lace-inset blouse is tucked into a silky peach skirt with a flattering paper bag waist and paired with blush heeled sandals. Complete the look with a statement necklace that resembles a cluster of pearls and delicate gold earrings.",
      "Urban Military: A structured cotton button-down shirt is worn beneath a utilitarian anorak and paired with distressed cargo pants. Styled with bulky military-inspired sneakers and rounded sunglasses, this look combines function and fashion.",
      "Bohemian Bliss: A floral applique maxi dress with a flattering bardot neckline and a relaxed A-line silhouette evokes a bohemian essence. Style it with a multi-strand beaded necklace, a layered bead and tassel bracelet, and flat sandals with an ankle buckle detail.",
      "Soft Form: A playful jersey top with statement balloon sleeves is tucked into high-rise carrot pants and accented with a form-fitting corseted belt. Keep the styling simple with minimalist gold earrings, a pendant necklace, and platform slide mules.",
      "Dark Academia: A long-sleeve micromodal cotton shirt is tucked into a structured midi skirt in a dark olive shade. Accentuate the academic vibe with a sweater vest in a subtle chevron pattern, with a bronze pendant necklace and vintage-inspired spectacles. Complete the look with chunky loafers and dark denim socks.",
      "Desert Escape: A vibrant multi-colored caftan is the perfect statement piece for a luxurious getaway. Wear it open over a white crop top and high-waist cream linen pants. Style your hair in a sleek bun, and add statement gold earrings and a layered bead necklace.",
      "Cottagecore Retro: A delicate lace blouse is styled beneath a bold retro-inspired floral minidress and completed with delicate pearl earrings, a vintage-inspired neck scarf, and white knee-high socks. Accentuate the ensemble with black patent leather Mary Jane heels.",
      "Urban Minimalist: A minimalist yet impactful look, boasting a bold olive boiler suit with a contrasting white stitch detail. Keep accessories to a minimum with a single oversized gold earring, a sleek black leather backpack, and black platform sneakers.",
      "Botanical Beauty: A silky button-down shirt with a retro botanic print is styled unconventionally, open and layered over a coordinating blouse. Wear it with a coordinated navy blue skirt, navy blue heels, and a delicate golden necklace.",
      "Sustainable Streetwear: A boxy recycled cotton blazer is styled over a white crop top and reconstructed denim jeans. Maintain an eco-conscious street style with a recycled polyester bucket hat, chunky recycled foam sneakers, and up-cycled statement jewelry.",
      "Coastal refinement: A lace-trimmed knitted dress in a subtle coral hue is perfect for a seaside getaway. Style with a delicate gold necklace, matching earrings, and metallic wedge sandals.",
      "Urban Geek: A structured take on business wear, a masculine inspired pinstripe pantsuit is paired with a simple black tank top and black platform sneakers. A sleek ponytail adds to the sophistication.",
      "Soft Focus: A sheer frosted blouse is layered over a coordinating satin slip dress for a soft, ethereal look. Keep the focus on the delicate fabrics and styling with loose wavy hair, a subtle blush palette for makeup, and delicate gold jewelry.",
      "Dark Attraction: A Victorian-inspired dress features a delicate lace overlay and a seductive, darkly alluring exposed back. This look is completed with a coordinating lace choker, statement black velvet earrings, and black heeled mules.",
      "Monochromatic Magic: A soothing sage green tailored pantsuit is accented with a gold metallic belt and matched with a crisp white shirt. This allows the intricate gold jewelry, including a delicate necklace and statement earrings to take center stage. Finish the look with black leather loafers and a sleek half-up, half-down hairstyle."
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
