export enum Subject {
  MATEMATIKA = 'Matematika',
  BAHASA_INDONESIA = 'Bahasa Indonesia'
}

export enum GradeLevel {
  GRADE_1 = 'Kelas 1',
  GRADE_2 = 'Kelas 2',
  GRADE_3 = 'Kelas 3',
  GRADE_4 = 'Kelas 4',
  GRADE_5 = 'Kelas 5',
  GRADE_6 = 'Kelas 6'
}

export interface QuizConfig {
  subject: Subject;
  grade: GradeLevel;
  questionCount: number;
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation?: string; // Made optional
  imageUrl?: string; // Added image support
}

export interface User {
  username: string;
  name: string;
  id_peserta: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  doubtful: Record<string, boolean>; // questionId -> isDoubtful
  isFinished: boolean;
  score: number;
  startTime: number;
  endTime?: number;
}

export interface ExamResult {
  timestamp: string;
  id_peserta: string;
  nama: string;
  mapel: string;
  skor: string;
  benar: string;
  salah: string;
  detail: string; // New field for detailed answers
}