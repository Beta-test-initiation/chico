"use client"

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import ml5 from 'ml5';
import Navbar from '/frontend/components/Navbar';
import Typed from 'typed.js';

function App() {
  const [query, setQuery] = useState('');
  const [bestMatch, setBestMatch] = useState('');
  const videoRef = useRef(null);
  const classifierRef = useRef(null);
  const intervalIdRef = useRef(null); // Ref to store the interval ID

  useEffect(() => {
    // Load the ML5 classifier
    const loadClassifier = async () => {
      classifierRef.current = await ml5.imageClassifier('MobileNet', () => {
        console.log('Model Loaded!');
      });
    };
    loadClassifier();
  }, []);

  const fetchMatch = async () => {
    try {
      const response = await axios.post('http://localhost:3001/search-outfits', {
        query: query
      });
      if (response.data.bestMatchOutfit) {
        setBestMatch(''); // Clear previous best match
        const bestMatchText = response.data.bestMatchOutfit;
        
        // Create a new instance of Typed.js
        new Typed('#bestMatch', {
          strings: [bestMatchText],
          typeSpeed: 50, // Typing speed in milliseconds
          onComplete: () => {
            console.log('Typing animation completed');
          }
        });
      } else {
        console.error('Error: Invalid bestMatchOutfit data');
      }
    } catch (error) {
      console.error('Error fetching matching outfit:', error);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    Array.from(files).forEach(file => {
      processImageFile(file);
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0]; // Assuming only one video is uploaded
    processVideoFile(file);
  };

  const processImageFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        classifierRef.current.classify(img, (err, results) => {
          if (err) {
            console.error(err);
            return;
          }
          const description = results[0].label;
          console.log(description);
          setQuery(prev => prev ? `${prev}, ${description}` : description);
        });
      };
    };
    reader.readAsDataURL(file);
  };

  const processVideoFile = (file) => {
    clearInterval(intervalIdRef.current); // Clear any existing interval
    const url = URL.createObjectURL(file);
    videoRef.current.src = url;
    videoRef.current.load();
    videoRef.current.onloadeddata = () => {
      videoRef.current.play();
      classifyVideoFramesPeriodically();
    };
  };

  const classifyVideoFramesPeriodically = () => {
    if (!videoRef.current) return;

    // Function to classify a frame and then wait for 3 seconds
    const classifyAndScheduleNext = () => {
      if (classifierRef.current && videoRef.current && !videoRef.current.paused && !videoRef.current.ended) {
        classifierRef.current.classify(videoRef.current, (error, results) => {
          if (error) {
            console.error(error);
            return;
          }
          const description = results[0].label;
          console.log(description);
          setQuery(prev => prev ? `${prev}, ${description}` : description);
        });
        // Schedule the next classification in 3 seconds
        setTimeout(classifyAndScheduleNext, 500);
      }
    };

    classifyAndScheduleNext();
  };

  useEffect(() => {
    // Cleanup interval when component unmounts
    return () => clearInterval(intervalIdRef.current);
  }, []);

  

  return (
    <div>
  <Navbar />
  <div className="bg-[#B3C0BD] flex flex-col justify-between min-h-screen">
    <div className="p-10">
    <h1 className='text-3xl mb-4 font-bold'>Make your own outfit</h1>
      <div className='w-[80px] h-[7px] bg-green-950 mb-40'></div>
      
  <div className='flex flex-row'>
    <div className="mr-10 ">
      <img src='/assets/streep.svg' />
    </div>
    <div className='flex flex-col mb-3 rounded p-4 bg-gray-200'>
        <p className='mb-3'>Let me help you make an outfit today!</p>
        <div className='w-[70vw]'>
          <div id="bestMatch"></div>
          
        </div>
       
      <div className='flex flex-row'>
        <div className="mb-4">
          <label htmlFor="imageUpload" className="inline-block text-green-950 border border-green-950 hover:bg-green-950 hover:text-white font-semibold py-2 px-4 rounded-md cursor-pointer">
            Upload Images
          </label>
          <input 
            id="imageUpload"
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageUpload} 
            className="hidden" 
          />
        </div>
        <div className="mb-4 ml-2">
          <label htmlFor="videoUpload" className="inline-block text-green-950 border border-green-950 hover:bg-green-950 hover:text-white font-semibold py-2 px-4 rounded-md cursor-pointer">
            Upload Video
          </label>
          <input 
            id="videoUpload"
            type="file" 
            accept="video/*" 
            onChange={handleVideoUpload} 
            className="hidden" 
          />
        </div>
      </div>
    </div>
  </div>
  <video ref={videoRef} width="400" controls style={{ display: 'none' }} />
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Describe the outfits you're looking for"
    className="w-full py-2 px-4 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
  />
  <button
    onClick={fetchMatch}
    className="bg-green-950 hover:bg-white hover:text-green-950 hover:border hover:brder-green-950 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
  >
    Find Outfits
  </button>
</div>

  </div>
</div>

  );
}

export default App;
