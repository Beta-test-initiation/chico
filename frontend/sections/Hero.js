'use client'
import React from 'react'
import styled from 'styled-components';
import { Almarai, ABeeZee } from 'next/font/google';

const HeroSection = styled.div`
  background: url('/home_background.svg');
  background-size: 100vw;
  background-size: 100vh;
  
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  height: 90vh;
  width: 100%;
  
  top: 0;
  z-index: 0;
`

const almarai = Almarai({
  weight: '700',
  subsets: ['arabic'], 
})

const abeezee = ABeeZee({
  weight: '400',
  subsets: ['latin'], 
})

const Hero = () => {
  return (
    <HeroSection >
      <div className="flex flex-col text-center items-center justify-center">
        <div className="flex flex-wrap w-[800px] text-[78px] text-white font-bold mt-20">
          <h1 className={almarai.className}>The Future Of Sustainable Fashion</h1>
        </div>
        <div className="mt-5 w-[700px] text-white text-[20px] font-semibold">
          <p className={abeezee.className}>Discover the Pulse of Your Community: Stay on top of the latest trends and fashion news  while supporting local businesses in your area!</p>
        </div>
      </div>
    </HeroSection>
  )
}

export default Hero
