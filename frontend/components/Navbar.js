import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div>
      <ul>
        <li><Link href='/'>Home</Link></li>
        <li><Link href='/news'>News</Link></li>
        <li><Link href='/resources'>Resources</Link></li>
        <li><Link href='/chatbot'>Streep</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
