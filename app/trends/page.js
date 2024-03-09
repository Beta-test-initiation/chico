// Inside your Next.js component
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchTrends } from '../serverUtilities';

export default function RunwayTrends() {
  const [trends, setTrends] = useState('');

  useEffect(() => {
    response = fetchTrends();
    setTrends(response.data.generations[0].text);
  }, []); 

  return (
    <div>
      <h1>Runway Trends</h1>
      <p>{trends}</p>
    </div>
  );
}
