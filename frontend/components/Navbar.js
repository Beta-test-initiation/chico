import Link from 'next/link'
import { Allura } from 'next/font/google'
import { ABeeZee } from 'next/font/google'
import React from 'react'

const allura = Allura({
    weight: '400',
    subsets: ['latin'], 
})

const abeezee = ABeeZee({
    weight: '400',
    subsets: ['latin'], 
})


const Navbar = () => {
  return (
    <div className="bg-white border-b">
        <div className={allura.className} >
            <Link href="/" className="flex items-center pt-2 ml-5 w-full text-7xl">
                Chico
            </Link>
        </div>

        <div className="flex space-x-6  mb-7 px-5 py-2 items-center justify-start">
            <div className={abeezee.className}>
                <Link href="/" className="hover:text-zinc-500 transition-colors">Home</Link>
            </div>

            <div className={abeezee.className}>
                <Link href="/news" className="hover:text-zinc-500 transition-colors">News</Link>
            </div>

            <div className={abeezee.className}>
                <Link href="/resources" className="hover:text-zinc-500 transition-colors">Resources</Link>
            </div>

            <div className={abeezee.className}>
                <Link href="/matcher"className="hover:text-green-950 hover:border hover:border-green-950 rounded hover:bg-white bg-green-950 p-2 text-white transition-colors">Streep</Link>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar
