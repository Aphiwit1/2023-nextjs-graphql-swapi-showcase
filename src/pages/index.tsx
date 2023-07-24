import Image from 'next/image'
import { Inter } from 'next/font/google'
import StarWarsList from '@/features/StarwarList/StarwarsList';
import Navbar from '@/features/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Navbar/>
      <StarWarsList/>
    </>
  )
}
