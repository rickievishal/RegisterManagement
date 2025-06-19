import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Student } from './models/Student.js';

dotenv.config();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(cors());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


app.post('/api/upload', async (req, res) => {
  const students = req.body.students;

  try {
    await Promise.all(
      students.map(async (student) => {
        const existingStudent = await Student.findOne({ rollNo: student.rollNo });

        const newExam = {
          ExamName: student.exam.examName,
          ExamData: student.exam,
        };

        if (!existingStudent) {
          await Student.create({
            rollNo: student.rollNo,
            name: student.name,
            exams: [newExam],
          });
          console.log(`Created new student ${student.name}`);
        } else {

          const examIndex = existingStudent.exams.findIndex(
            (exam) => exam.ExamName === student.exam.examName
          );

          if (examIndex !== -1) {
            existingStudent.exams[examIndex] = newExam;
          } else {
            existingStudent.exams.push(newExam);
          }

          await existingStudent.save();
          console.log(`Updated student ${student.name}`);
        }
      })
    );

    res.status(200).json({ message: 'All students processed successfully' });
  } catch (err) {
    console.error('Error updating students:', err);
    res.status(500).json({ message: 'Something went wrong while uploading' });
  }
});


// Fetch all exams for a roll number
app.get('/api/report/:rollNo', async (req, res) => {
  try {
    const studentReports = await Student.find({ rollNo: req.params.rollNo });
    res.json(studentReports);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reports' });
  }
});
app.get('/api/students', async(req, res) => {
  try{
    const students = await Student.find({})
    const resposeData = students.map((student)=> ({
      name : student.name,
      rollNo : student.rollNo
    }))
    res.json(resposeData)
  }catch(err){
    console.log(err)
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=> console.log("started the server"))