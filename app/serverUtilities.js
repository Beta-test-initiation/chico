
"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

export const fetchTrends = async () => {
    try {
      const response = await axios.post('http://localhost:3001/generate-trends', {
        prompt: "give me 15 latest runway trends for the 2024 season, can you also give a percentage of how that trend has increased, which particular clothing articles, colors are popular as well as for how long they have been popular for.",
      });
      console.log(response.data.generations[0].text);
      // Correct the way to set the state
     

    } catch (error) {
      console.error('Error generating trends:', error);
    }
  };
