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
    <div className="h-167 bg-white">
        <div className="flex items-center ml-10 w-full text-[20px]">
            <Link href="/" className={allura.className}>
                Chico
            </Link>
        </div>

        <div className="flex space-x-6 border-b mb-10 px-5 py-5 items-center justify-start">
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
                <Link href="/chatbot"className="hover:text-zinc-500 transition-colors">Streep</Link>
            </div>
            
        </div>
    </div>
  )
}

export default Navbar
