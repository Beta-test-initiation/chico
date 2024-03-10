import Link from 'next/link'
import { Allura } from 'next/font/google'
import { ABeeZee } from 'next/font/google'

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
    <div>
        <div class="flex items-center fixed top-0 w-full">
            <Link href="/">
                <p className={allura.className}>Chico</p>
            </Link>
        </div>

        <div className="flex flex-row items-center">
            <div className={abeezee.className}>
                <Link href="/" className={abeezee.className}>Home</Link>
            </div>

            <div className="p-5">
                <Link href="/news" className={abeezee.className}>News</Link>
            </div>

            <div className="p-5">
                <Link href="/resources" className={abeezee.className}>Resources</Link>
            </div>

            <div className={abeezee.className}>
                <Link href="/chatbot" className="bg-green">Streep</Link>
            </div>
        </div>
    </div>
  )
}

export default Navbar
