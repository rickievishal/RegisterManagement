"use client"
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const page = () => {
    const {rollNo} = useParams()
    console.log(rollNo)
    const [studentData,setStudentData] =useState({})
    useEffect (()=>{
        const handleViewGradeSheet = async(rollNo) => {
            try {
                const res = await axios.get(`http://localhost:3001/api/report/${rollNo}`)
                setStudentData(res.data[0])
                console.log(res.data)
            }catch(err) {
                console.log(err)
            }
        }
        handleViewGradeSheet(rollNo)
        },[rollNo])
    const getTableRows = () => {

    }
    const handlePrint = (student) => {
    const TableRows = getTableRows()
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
  <html>
    <head>
      <title>Marksheet - ${studentData.name}</title>
      <style>
        @page { size: A4; margin: 20mm; }
        body { font-family: Arial, sans-serif; font-size: 12px; padding: 10px; }

        h1 {
          text-align: center;
          font-size: 16px;
          margin-bottom: 10px;
        }

        p {
          margin: 4px 0;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }

        th, td {
          border: 1px solid black;
          padding: 6px;
          text-align: center;
        }

        th {
          background-color: #ffff;
          color: #000;
        }

        .signature {
          display: grid;
          grid-template-columns: 1fr 1fr;
          border-top: 1px solid #000;
        }

        .signature-cell {
          padding: 10px 0;
          border-right: 1px solid #000;
        }

        .signature-cell:last-child {
          border-right: none;
        }

        .footer {
          text-align: right;
          margin-top: 40px;
          font-size: 12px;
        }
        .grid{
            
        }
        .custom {
            padding:0px;
        }
      </style>
    </head>
    <body>
      <h1>Student Grade Sheet</h1>

      <p><strong>Roll No:</strong> ${studentData.rollNo}</p>
      <p><strong>Name:</strong> ${studentData.name}</p>

      <table>
        <thead>
          <tr>
            <th>Tests</th>
            <th>Date</th>
            <th>MM</th>
            <th>MR</th>
            <th>PM</th>
            <th>PR</th>
            <th>CM</th>
            <th>CR</th>
            <th>BM</th>
            <th>BR</th>
            <th>TM</th>
            <th>TR</th>
            <th class="custom" colspan="2">
                <div style="display: grid; grid-template-columns: 1fr 1fr; ">
                    <div style="grid-column: span 2; text-align: center; font-weight: bold; padding: 5px 0;">
                        sign.
                    </div>
                    <div style="border-top: 1px solid black; border-right: 1px solid black; text-align: center; padding : 10px">
                        prin.
                    </div>
                    <div style="border-top: 1px solid black; text-align: center; padding : 10px ">
                        pare.
                    </div>
                </div>
            </th>
          </tr>
        </thead>
        <tbody>
          ${studentData?.exams?.map((exam) => `
            <tr>
              <td>${exam.ExamName}</td>
              <td>${studentData.createdAt?.slice(0, 10) || ''}</td>
              <td>${exam.ExamData.subjectScores.subject1 || ''}</td>
              <td>${exam.ExamData.subjectRanks.subject1 || ''}</td>
              <td>${exam.ExamData.subjectScores.subject2 || ''}</td>
              <td>${exam.ExamData.subjectRanks.subject2 || ''}</td>
              <td>${exam.ExamData.subjectScores.subject3 || ''}</td>
              <td>${exam.ExamData.subjectRanks.subject3 || ''}</td>
              <td>${exam.ExamData.subjectScores.subject2 || ''}</td>
              <td>${exam.ExamData.subjectRanks.subject2 || ''}</td>
              <td>${exam.ExamData.totalMarks || ''}</td>
              <td>${exam.ExamData.rank || ''}</td>
              <td></td>
              <td></td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <p class="footer">Generated on ${new Date().toLocaleString()}</p>
    </body>
  </html>
`);
    printWindow.document.close();
    printWindow.print();
  };
  return (
    <div className='max-w-7xl mx-auto px-2 lg:px-4 '>
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex-col items-center justify-start'>
                <h1>
                    Student Grade Sheet
                </h1>
                <div className='w-full flex-col'>
                    <div className='w-full flex justify-end items-center'>
                        <button className='px-4 text-md bg-black text-white rounded-lg hover:cursor-pointer' onClick={handlePrint}>Print</button>
                    </div>
                </div>
            </div>
            <div className='w-full '>
                 <table className='w-full rounded-md border-[1px] border-black' border="1"  cellPadding="8" style={{ marginTop: 20 }}>
                    <thead>
                        <tr className='border-[1px] border-white' >
                        <th className='border-[1px] border-white text-white bg-black'>Tests</th>
                        <th className='border-[1px] border-white text-white bg-black'>Date</th>

                        <th className='border-[1px] border-white text-white bg-black'>MM</th>
                        <th className='border-[1px] border-white text-white bg-black'>MR</th>

                        <th className='border-[1px] border-white text-white bg-black'>PM</th>
                        <th className='border-[1px] border-white text-white bg-black'>PR</th>

                        <th className='border-[1px] border-white text-white bg-black'>CM</th>
                        <th className='border-[1px] border-white text-white bg-black'>CR</th>

                        <th className='border-[1px] border-white text-white bg-black'>BM</th>
                        <th className='border-[1px] border-white text-white bg-black'>BR</th>

                        <th className='border-[1px] border-white text-white bg-black'>TM</th>
                        <th className='border-[1px] border-white text-white bg-black'>TR</th>
                        
                        <th className='border-[1px] border-black text-white bg-black'  colSpan={2}>
                            <div className='grid grid-cols-2 '>
                                <div className='col-span-2'>
                                    SIGNATURE
                                </div>
                                <div className='col-span-1 border-t-[1px] border-r-[1px] border-white'>
                                        PRINCIPAL
                                </div>
                                <div className='col-span-1 border-t-[1px] border-white'>
                                        PARENTS
                                </div>
                            </div>
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            studentData?.exams?.map((exam, index) => (
                                <tr className='border-[1px] border-black' key={index}>
                                    <td className='border-r-[1px] px-4 '><p className="text-center">{exam.ExamName}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{studentData.createdAt.slice(0,10)}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectScores.subject1}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectRanks.subject1}</p></td>

                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectScores.subject2}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectRanks.subject2}</p></td>

                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectScores.subject3}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectRanks.subject3}</p></td>

                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectScores.subject2}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.subjectRanks.subject2}</p></td>

                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.totalMarks}</p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'>{exam.ExamData.rank}</p></td>
                                    
                                    <td className='border-r-[1px] px-2'><p className='text-center'></p></td>
                                    <td className='border-r-[1px] px-2'><p className='text-center'></p></td>

                                </tr>
                                ))
                        }
                        
                    </tbody>
                    </table>
            </div>
        </div>
    </div>
  )
}

export default page