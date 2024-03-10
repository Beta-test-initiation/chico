// Inside your Next.js component
"use client";
import websiteData from '../websitedata.json';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RunwayTrends() {
  const [trends, setTrends] = useState([]);

  const findTrendUrl = (trendName) => {
    // Attempt to find a URL by checking if any key in websiteData contains a part of the trendName
    const matchedKey = Object.keys(websiteData).find(key => trendName.toLowerCase().includes(key.toLowerCase()));
    return matchedKey ? websiteData[matchedKey] : 'https://placeholder.com';
  };

  const fetchTrends = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-trends', {
        prompt: "give me 15 latest runway trends for the 2024 season, can you also give a precentage of how that trend has increased, which particular clothing articles, colors are popular as well as for how long they have been popular for.         ",
      });
     
      const fullText = response.data.generations[0].text;
      setTrends(processText(fullText));

    } catch (error) {
      console.error('Error generating trends:', error);
    }
  };

  const processText = (fullText) => {
    const trendEntries = fullText.split(/\d+\./).slice(1); // Skip the first empty entry from split
  
    const extractedTrends = trendEntries.map((entry) => {
      const parts = entry.split(' - ' || ':' || ': ' || ' : ');
      const name = parts[0]?.trim();
      const description = parts[1]?.trim() || "Description not available.";
      const url = findTrendUrl(name); // Find URL for the trend or use placeholder
  
      return { name, description, url };
    });
  
    return extractedTrends;
  };
  
  useEffect(() => {
    fetchTrends();
  }, []); 

  return (
    <div>
      <h1>Runway Trends</h1>
      
      {trends.map((trend, index) => (
        <div key={index}>
          <h2>{trend.name}</h2>
          <p>{trend.description}</p>
          <p>{trend.url}</p>
        </div>
      ))}
    </div>
  );
}
