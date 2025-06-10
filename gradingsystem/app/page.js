"use client"
import React from 'react'
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter()
  const handleUploadspath =() =>{
    router.push('/uploadmark')
  }
  return (
    <div className='w-screen max-w-7xl mx-auto px-8 flex flex-col'>

        <div className='py-4'>
        <h1 className='text-xl'>
          Actions
        </h1>
        </div>
      <div className='flex items-center'>
        <p className='pr-4'>
          Start uploading the csv file with 
        </p>
        <button className='px-4 py-1 rounded-lg bg-black text-white hover:bg-gray-800 hover:cursor-pointer' onClick={handleUploadspath}>
          Upload Marks
      </button>
      </div>
      <div className='flex items-center mt-2'>
        <p className='pr-4'>
          Access Student Register. 
        </p>
        <button className='px-4 py-1 rounded-lg bg-black text-white hover:bg-gray-800 hover:cursor-pointer' onClick={handleUploadspath}>
          View
      </button>
      </div>
    </div>
  )
}

export default page