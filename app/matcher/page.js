"use client"

import axios from 'axios';
import { useState, useRef, useEffect } from 'react';
import ml5 from 'ml5';

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
      setBestMatch(response.data.bestMatchOutfit);
      console.log(response.data);
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
        setTimeout(classifyAndScheduleNext, 3000);
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
      <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
      <input type="file" accept="video/*" onChange={handleVideoUpload} />
      <video ref={videoRef} width="400" controls style={{ display: 'none' }} />
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
