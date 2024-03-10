// Inside your Next.js component
"use client";
import websiteData from '../websitedata.json';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Masonry from 'react-responsive-masonry';

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
      const generatedTrends = processText(fullText);
      setTrends(generatedTrends);
      console.log(trends);
      console.log(processText(fullText));

    } catch (error) {
      console.error('Error generating trends:', error);
    }
  };

  const processText = (fullText) => {
    const trendEntries = fullText.split(/\d+\./).slice(1); // Skip the first empty entry from split
    //console.log(trendEntries);
    const extractedTrends = trendEntries.map((entry) => {
      const parts = entry.split(/ - |: |:| : /);
      const name = parts[0]?.trim();
      const description = parts[1]?.trim() || "Description not available.";
      const url = findTrendUrl(name); // Find URL for the trend or use placeholder
  
      return { name, description, url };
    });
    console.log(extractedTrends);
    return extractedTrends;
  };
  
  useEffect(() => {
    fetchTrends();
    console.log(trends);
  }, []); 


  const styles = {
    pin_container: {
        width: '90vw',
        justifyContent: 'center'
      }
    };

  return (
    <div className='ml-10 mt-10 w-100vw'>
      <h1 className='text-3xl mb-4 font-bold'>Most Popular</h1>
      <div className='w-[80px] h-[7px] bg-green-950 my-4'></div>
      <Masonry columnsCount={3} style={styles.pin_container}>
      {trends.map((trend, index) => (
        <a href={trend.url} key={index}>
          <div className="relative inline-block group">
          <div className="relative w-full h-auto">
              <img
                src={`/assets/trends/${index}.jpeg`}
                alt={trend.name}
                className="w-auto h-auto opacity-70 group-hover:opacity-90"
              />
              <div className="opacity-0 absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent group-hover:opacity-100 transition-opactivy"></div>
            </div>
            <h2 className='text-center opacity-0 text-white absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 group-hover:opacity-100'>
              {trend.name}
            </h2>
          </div>

     </a>
        ))}
      </Masonry>
   </div>
  );
}
