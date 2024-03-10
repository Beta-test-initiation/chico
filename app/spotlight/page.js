// pages/monthly-spotlight.js

import React from 'react';
import styled from 'styled-components';
import Navbar from '@/frontend/components/Navbar';
import { Almarai, ABeeZee } from 'next/font/google';

const SpotlightPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  font-family: 'Almarai', sans-serif;
  margin-top: 40px;
  color: #022C22; /* Set text color to dark green */
`;

const Title = styled.h1`
  font-family: 'Almarai', sans-serif;
  font-size: 60px;
  font-weight: bold;
  margin-top: 40px;
`;

const SpotlightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

const SpotlightImage = styled.img`
  width: 438px;
  height: 363px;
  margin-right: 20px;
`;

const SpotlightContent = styled.div`
  font-family: 'aBeeZee', sans-serif;
  font-size: 38px;
  font-weight: bold;
  color: #022C22; /* Set text color to dark green */
`;

const ContentText = styled.p`
  font-family: 'aBeeZee', sans-serif;
  font-size: 24px;
  margin-top: 10px; /* Add spacing between title and paragraph */
`;

const MonthlySpotlightPage = () => {
  return (
    <div>
      <Navbar />
      <SpotlightPageContainer>
        <Title>Monthly Spotlight</Title>
        <SpotlightSection>
          <SpotlightImage
            src="/path/to/your/image.jpg" // Replace with the actual path to your image
            alt="Monthly Spotlight"
          />
          <SpotlightContent>
            Handmade Legacy: Meet the Canadian Textile Artist Behind...
            <ContentText>
              Sample paragraph text. Handmade Legacy: Meet the Canadian Textile Artist Behind the amazing creations.
              Describe the artist's journey and the inspiration behind their work.
            </ContentText>
          </SpotlightContent>
        </SpotlightSection>
      </SpotlightPageContainer>
    </div>
  );
}

export default MonthlySpotlightPage;
