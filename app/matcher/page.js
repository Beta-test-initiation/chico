"use client"

import axios from 'axios';
import { useState } from 'react';
import ml5 from 'ml5';

function App() {
  const [query, setQuery] = useState('');
  const [bestMatch, setBestMatch] = useState('');

  const fetchMatch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/search-outfits', {
        query: query
      });
      setBestMatch(response.data.bestMatchOutfit);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching matching outfit:', error);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = async () => {
          const classifier = await ml5.imageClassifier('MobileNet');
          console.log('Model Loaded!');
          classifier.classify(img, (err, results) => {
            if (err) {
              console.error(err);
            } else {
              const description = results[0].label;
              console.log(description);
              // Concatenate or handle the classification result for each image
              setQuery(prev => prev ? `${prev}, ${description}` : description);
            }
          });
        };
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageUpload} />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe the outfits you're looking for"
      />
      <button onClick={fetchMatch}>Find Outfits</button>
      {bestMatch && <div>Best Match: {bestMatch}</div>}
    </div>
  );
}

export default App;
