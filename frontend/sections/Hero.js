'use client'
import React from 'react'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import { Almarai } from 'next/font/google';

const HeroSection = styled.div`
  background: url('/home_background.svg');
  background-size: 100vw;
  background-size: 100vh;
  
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  height: 100%;
  width: 100%;
  
  position: absolute;
  top: 0;
  z-index: 0;
`

const almarai = Almarai({
  weight: '700',
  subsets: ['arabic'], 
})

const Hero = () => {
  return (
    <HeroSection>
      <Navbar />
      <div className="flex flex-col text-center items-center justify-center h-screen">
        <div className="flex flex-wrap width-30 text-4xl text-white font-bold">
          <h1 className={almarai.className}>The Future Of Sustainable Fashion</h1>
        </div>
        <div className="w-300">
          <p className="text-white">Discover the Pulse of Your Community: Stay on top of the latest trends and fashion news  while supporting local businesses in your area!</p>
        </div>
      </div>
    </HeroSection>
  )
}

export default Hero
