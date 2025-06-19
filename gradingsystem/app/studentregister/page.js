"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const page = () => {
    const [students,setStudents] = useState([])
    useEffect(() => {
        const getStudents =async () => {
            const res = await axios.get("http://localhost:3001/api/students")
            .then((res) =>{
                setStudents(res.data)
                console.log(res.data)
            })
            .catch((err) => console.log(err))
            
        }
        getStudents()
    
    }, [])
    const handleViewGradeSheet = async(rollNo) => {
        try {
            const res = await axios.get(`http://localhost:3001/api/report/${rollNo}`)
            console.log(res.data)
        }catch(err) {
            console.log(err)
        }
    }
  return (
    <div className='w-full max-w-7xl mx-auto px-2 lg:px-4'>
            <div className='w-full flex flex-col justify-center items-center'>
                <div>
                    <h1>
                        StudentRegister
                    </h1>
                </div>
                <div className='w-full'>
                        {students.length > 0 && (
                                <table className='w-full rounded-md border-[1px] border-black' border="1"  cellPadding="8" style={{ marginTop: 20 }}>
                                <thead>
                                    <tr className='border-[1px] border-s-black'>
                                    <th className='border-[1px] border-black text-white bg-black py-2'>Roll No</th>
                                    <th className='border-[1px] border-black text-white bg-black'>Name</th>
                                    <th className='border-[1px] border-black text-white bg-black'>Actions</th>

                                    {/* <th>Actions</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                    <tr className='border-[1px] border-black' key={index}>
                                        <td className='border-r-[1px] px-4 py-2'>{student.rollNo}</td>
                                        <td className='border-r-[1px] px-4 py-2'>{student.name}</td>
                                        <td className='flex justify-center items-center py-2'>
                                            <p className='pr-2'>
                                                GradeSheet
                                            </p>
                                       <Link href={`/studentregister/student/${student.rollNo}`}>
                                            <button className='bg-black text-white rounded-md px-2 hover:cursor-pointer' onClick={()=> handleViewGradeSheet(student.rollNo)}>view</button>
                                        </Link>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            )}
                </div>
            </div>
    </div>
  )
}

export default page