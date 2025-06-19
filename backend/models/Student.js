import mongoose from 'mongoose';

const AnswerSchema = new mongoose.Schema({
  questionNumber: Number,
  correctOption: String,
  selectedOption: String
}, { _id: false });

const StudentSchema = new mongoose.Schema({
  rollNo: { type: String, required: true },
  name: String,
  exams : [
    {
      ExamName : {type: String},
      ExamData : {
        examName: String,
        examSet: String,
        totalMarks: Number,
        grade: String,
        rank: Number,
        correctAnswers: Number,
        incorrectAnswers: Number,
        notAttempted: Number,
        subjectScores: {
          subject1: Number,
          subject2: Number,
          subject3: Number,
          subject4: Number,
        },
        subjectRanks : {
          subject1: Number,
          subject2: Number,
          subject3: Number,
          subject4: Number,
        },
        answers: [AnswerSchema],
      }
    },
  ],
  createdAt: { type: Date, default: Date.now }
});

export const Student = mongoose.model('Student', StudentSchema);
