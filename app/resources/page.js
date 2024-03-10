// pages/resources.js

import React from 'react';
import Navbar from '@/frontend/components/Navbar';

export default function Page() {
  const pageContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'rgba(2, 44, 34, 0.3)', // Background color with 30% opacity
    minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
    padding: '20px', // Add padding for better visibility
  };

  const navbarStyle = {
    backgroundColor: 'transparent', // Set navbar background color to transparent
  };

  const resourcesPageContainerStyle = {
    width: '80%', // Adjust the width as needed
    fontFamily: 'Almarai, sans-serif',
  };

  const titleStyle = {
    fontFamily: 'Almarai, sans-serif',
    fontSize: '60px',
    fontWeight: 'bold',
  };

  const sectionStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '20px',
  };

  const subTitleStyle = {
    fontFamily: 'aBeeZee, sans-serif',
    fontSize: '16px',
  };

  const h2Style = {
    fontFamily: 'aBeeZee, sans-serif',
    fontSize: '24px', // Adjust the font size for h2 as needed
    fontWeight: 'bold', // Make h2 bold if desired
  };

  const textStyle = {
    fontFamily: 'aBeeZee, sans-serif',
    fontSize: '16px',
    marginBottom: '10px', // Added spacing between paragraphs
  };

  return (
    <div style={pageContainerStyle}>
      <Navbar style={navbarStyle} />
      <div style={resourcesPageContainerStyle}>
        <h1 style={titleStyle}>Resources</h1>
        <div style={sectionStyle}>
          <h2 style={subTitleStyle}>
            Fashion isn't just about what you wear – it's about how it makes you feel.
          </h2>
          <p style={textStyle}>
            At Chico, we believe that expressing yourself through fashion can have a positive impact on your mental well-being.
            That's why we've curated a collection of resources to help you harness the power of fashion to boost your mood, confidence, and overall sense of self.
          </p>
        </div>
        <div style={sectionStyle}>
          <h2 style={h2Style}>Crisis and Helplines</h2>
          <p style={textStyle}>
            <strong>Crisis Intervention and Suicide Prevention Centre of BC:</strong> Call 1-800-SUICIDE (1-800-784-2433) or visit their website: <a href="https://crisiscentre.bc.ca" target="_blank">crisiscentre.bc.ca</a>.
          </p>
          <p style={textStyle}><strong>Crisis Centre Chat:</strong> Online chat support is available from the Crisis Intervention and Suicide Prevention Centre of BC. Visit their website: crisiscentre.bc.ca/chat</p>
          <p style={textStyle}><strong>310Mental Health Support:</strong> Dial 310-6789 (no area code required) for emotional support, information, and resources 24/7 across BC.</p>
          <p style={textStyle}><strong>9-8-8 Suicide Crisis Helpline:</strong> 9-8-8 Suicide Crisis Helpline follows a network model. When you call or text 9-8-8, you will reach a responder at one of nearly 40 local, provincial and territorial, and national crisis lines, who co-deliver the service. Visit their website: <a href="https://988.ca" target="_blank">988.ca</a></p>
        </div>
        <div style={sectionStyle}>
          <h2 style={h2Style}>Mental Health Organizations and Services</h2>
          <p style={textStyle}><strong>Here to Help:</strong> Provides information on mental health and substance use issues. Visit their website: heretohelp.bc.ca</p>
          <p style={textStyle}><strong>Canadian Mental Health Association (CMHA) BC Division:</strong>  Provides resources and support for mental health. Visit their website: cmha.bc.ca</p>
          <p style={textStyle}><strong>CounsellingBC:</strong>   Offers online information and resource in British Columbia regarding counselling, psychological services, art therapy and psychotherapy, as practiced by professionals with the following designations. Visit their website: counsellingbc.com</p>
        </div>
      </div>
    </div>
  );
}
