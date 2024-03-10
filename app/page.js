import Image from "next/image";

import Hero from "/frontend/sections/Hero";
import Navbar from "/frontend/components/Navbar";
import RunwayTrends from "./trends/page";



export default function Home() {
  return (
    <div> 
      <Navbar />
      <Hero />
      <RunwayTrends />
    </div>

  );
}