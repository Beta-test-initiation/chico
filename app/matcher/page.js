"use client"

import axios from 'axios';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState('summer');
  const [bestMatch, setBestMatch] = useState('');

  const fetchMatch = async () => {
    try {
      // Assuming `query` is the state variable containing the user's search input
      const response = await axios.post('http://localhost:3001/search-outfits', {
        query: query // Sending user's query to the server
      });

      // Process the response to get the best matching outfit
      setBestMatch(response.data.bestMatch); // Update state with the best match

    } catch (error) {
      console.error('Error fetching matching outfit:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe the outfit you're looking for"
      />
      <button onClick={fetchMatch}>Find Outfit</button>
      {bestMatch && <div>Best Match: {bestMatch}</div>}
    </div>
  );
}

export default App;
