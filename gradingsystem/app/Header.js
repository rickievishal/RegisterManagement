import Link from 'next/link';
import React from 'react'
import { TiHome } from "react-icons/ti";
const Header = () => {
  return (
    <nav className='w-full flex justify-center py-2 bg-black text-white mb-4'>
      <div className='max-w-7xl w-full mx-auto flex justify-start items-center px-4'>
        <div className="w-full flex justify-between">
          <Link href={"/"}>
          <h1 className="flex items-center">
            <span className='mr-4 text-xl'><TiHome /></span>
            Admin Tools
          </h1>
          </Link> 
          <button className='text-black bg-white rounded-lg px-4'>
             Log out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header