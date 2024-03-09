// Inside your Next.js component
"use client"
import { useState } from 'react';
import axios from 'axios';

export default function RunwayTrends() {
  const [trends, setTrends] = useState('');

  const fetchTrends = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-trends', {
        prompt: "Predict the latest runway fashion trends for the 2024 season.",
      });
      setTrends(response.data.generations[0].text);
    } catch (error) {
      console.error('Error generating trends:', error);
    }
  };

  return (
    <div>
      <h1>Runway Trends</h1>
      <button onClick={fetchTrends}>Get Latest Trends</button>
      <p>{trends}</p>
    </div>
  );
}
