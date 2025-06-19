"use client"
import React from 'react'
import { useRouter } from 'next/navigation';
import { GoArrowRight } from "react-icons/go";
import axios from 'axios';
import Link from 'next/link';

const page = () => {
  const router = useRouter()
 
 
  return (
    <div className='w-screen max-w-7xl mx-auto px-8 flex flex-col'>
      <div className='w-full flex justify-center items-center'>
        <div className='py-12 pt-4 border border-gray-500 bg-gray-50 px-4 rounded-lg'>
          <div className='w-[350px] flex flex-col items-center'>
                  <h1 className='w-full text-left text-2xl'>
                    Actions
                  </h1>
                <Link className='w-full' href={"/uploadmark"}>
                  <div className='w-full flex flex-row justify-between items-center px-3 py-2 mt-2 border border-gray-400 gap-4 rounded-lg hover:cursor-pointer bg-white hover:bg-gray-100'>
                      <p>
                        Upload Students Mark Portal
                      </p>
                        <button className='w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center'>
                              <GoArrowRight />
                        </button>
                  </div>
              </Link> 
               <Link className='w-full' href={"/studentregister"}>
                  <div className='w-full flex flex-row justify-between items-center px-3 py-2 mt-2 border border-gray-400 gap-4 rounded-lg hover:cursor-pointer bg-white hover:bg-gray-100'>
                      <p>
                        View Student Register
                      </p>
                        <button className='w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center'>
                              <GoArrowRight />
                        </button>
                  </div>
              </Link> 
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default page