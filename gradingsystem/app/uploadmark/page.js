"use client"
import React, { useRef, useState } from 'react'
import Papa from 'papaparse';
import axios from 'axios';
import { AiOutlineCloudUpload } from "react-icons/ai";
const page = () => {
  const [students, setStudents] = useState([]);
  const [fileName, setFileName] = useState("Not selected");
  const [exam,setExam] = useState("Not selected")
  const exams = ["Cat1","Cat2","Cat3","Not selected"]
  const [studentsArray,setStudentsArray] = useState([])
  const handleUpload = async() => {
    const payload = {
      "students" : studentsArray
    }
     console.log(studentsArray)
    await axios.post("http://localhost:3001/api/upload",payload,{
      headers : {"Content-Type" : "application/json"}
    })
    .then(()=>{console.log("connected")})
    .catch((err)=>console.log("err",err))
  }
  const getFormatedData = (data) => {
  const newStudents = data.map((student) => {
    const examName = student["Exam"];
    const examSet = student["Exam set"];
    const rollNo = student["Roll No"];
    const name = student["Name"];

    const totalMarks = parseFloat(student["Total Marks"]);
    const grade = student["Grade"];
    const rank = parseInt(student["Rank"]);

    const correctAnswers = parseInt(student["Correct Answers"]);
    const incorrectAnswers = parseInt(student["Incorrect Answers"]);
    const notAttempted = parseInt(student["Not attempted"]);

    const subjectScores = {
      subject1: parseFloat(student["Subject 1"]),
      subject2: parseFloat(student["Subject 2"]),
      subject3: parseFloat(student["Subject 3"]),
      subject4: parseFloat(student["Subject 4"])
    };

    let answers = [];
    for (let i = 1; i <= 90; i++) {
      const questionNumber = i;
      const correctOption = student[`Q ${i} Key`];
      const selectedOption = student[`Q ${i} Options`];

      answers.push({ questionNumber, correctOption, selectedOption });
    }
    const subjectRanks = {
      subject1 : 23,
      subject2 : 14,
      subject3 : 5,
      subject4 : 2
    }
    const formattedData = {
      rollNo,
      name,
      exam: {
        examName,
        examSet,
        totalMarks,
        grade,
        rank,
        correctAnswers,
        incorrectAnswers,
        notAttempted,
        subjectScores,
        subjectRanks,
        answers,
      }
    };

    return formattedData;
  });

  setStudentsArray(newStudents);
};

  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name)
    console.log(file.name)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        console.log(results)
        getFormatedData(results.data)
        setStudents(results.data);
      },
    });
  };
  
  const getQuestion = (student) => {
    let str = "";
    for (let i = 1; i <= 90; i++) {
      const answer = student[`Q ${i} Options`] || '-';
      const key = student[`Q ${i} Key`] || '-';
      const marks = student[`Q ${i} Marks`] || '-';
    
      str += `
        <tr>
          <td>${i}</td>
          <td>${answer}</td>
          <td>${key}</td>
          <td>${marks}</td>
        </tr>
      `;
    }
    return str;
  };
  const handleSelect = (e) => {
    setExam(e.target.value)
  } 
  const handlePrint = (student) => {
    const QuestionTable = getQuestion(student);
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Marksheet - ${student['Name']}</title>
          <style>
            @page { size: A4; margin: 20mm; }
            body { font-family: Arial; font-size: 14px; padding: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #000; padding: 6px; text-align: center; }
            h2 { text-align: center; }
          </style>
        </head>
        <body>
          <h2>Marksheet</h2>
          <p><strong>Roll No:</strong> ${student['Roll No']}</p>
          <p><strong>Name:</strong> ${student['Name']}</p>
          <p><strong>Total Marks:</strong> ${student['Total Marks']}</p>
          <p><strong>Rank:</strong> ${student['Rank']}</p>
          <table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answered</th>
                <th>Key</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              ${QuestionTable}
            </tbody>
          </table>
          <hr/>
          <p style="text-align:right;">Generated on ${new Date().toLocaleString()}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };
  const fileref = useRef()
  const handleChoose = () => {
        fileref.current.click();
  }
  const HandleUploadExam = () =>{
   
  }
  return (
    <div className='max-w-7xl w-full mx-auto px-8 py-8'>
        <h1 className='text-xl'>
            Results Upload Page
        </h1>
         <div className='flex gap-2 items-center mt-4'>
           {
            !studentsArray.length && (<p className='flex items-center'>
             <AiOutlineCloudUpload className='text-2xl mr-2 text-blue-500' /> Upload a file to proceed
            </p>)
           }
        </div>
        <div className='flex gap-2 items-center mt-4'>
            <p>
                {fileName}
            </p>
            <input type="file" accept=".csv" className='bg-black text-white rounded-r-full hidden' ref={fileref} onChange={handleFileUpload} />
            <button onClick={handleChoose} className='text-sm bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 hover:cursor-pointer'>
                choose
            </button>
        </div>
       {
        students.length === 0 && (
            <div className='w-full h-[200px] bg-gray-50 rounded-lg flex justify-center items-center my-4 border-[1px] border-gray-200'>
                    <p>
                        Select the file to view
                    </p>
            </div>
        )
       }    
      {students.length > 0 && (
        <table className='w-full rounded-md border-[1px] border-black' border="1"  cellPadding="8" style={{ marginTop: 20 }}>
          <thead>
            <tr className='border-[1px] border-black'>
              <th className='border-[1px] border-black text-white bg-black'>Roll No</th>
              <th className='border-[1px] border-black text-white bg-black'>Exam</th>
              <th className='border-[1px] border-black text-white bg-black'>Name</th>
              <th className='border-[1px] border-black text-white bg-black'>Total Marks</th>
              <th className='border-[1px] border-black text-white bg-black'>Rank</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr className='border-[1px] border-black' key={index}>
                <td className='border-r-[1px] px-4'>{student['Roll No']}</td>
                <td className='border-r-[1px] px-4'>{student['Exam']}</td>
                <td className='border-r-[1px] px-4'>{student['Name']}</td>
                <td className='border-r-[1px] px-4'>{student['Total Marks']}</td>
                <td className='border-r-[1px] px-4'>{student['Rank']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className='w-full flex justify-end py-2'>
             {
              studentsArray.length > 0 && (
                <button className='text-sm bg-black text-white px-4 py-1 rounded-md hover:bg-gray-800 hover:cursor-pointer' onClick={handleUpload}>
                Upload
                </button>
              ) 
             }
      </div>
    </div>
  );
};

export default page;
