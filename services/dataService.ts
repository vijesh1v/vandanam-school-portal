import { Student, FeeRecord, User } from '../types';
import { INITIAL_STUDENTS, INITIAL_FEES } from '../constants';

const STUDENTS_KEY = 'vandanam_students';
const FEES_KEY = 'vandanam_fees';

// Initialize data if empty
export const initializeData = () => {
  if (!localStorage.getItem(STUDENTS_KEY)) {
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(INITIAL_STUDENTS));
  }
  if (!localStorage.getItem(FEES_KEY)) {
    localStorage.setItem(FEES_KEY, JSON.stringify(INITIAL_FEES));
  }
};

export const getStudents = (): Student[] => {
  const data = localStorage.getItem(STUDENTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getStudent = (id: string): Student | undefined => {
  const students = getStudents();
  return students.find(s => s.id === id);
};

export const saveStudent = (student: Student): void => {
  const students = getStudents();
  const index = students.findIndex(s => s.id === student.id);
  if (index >= 0) {
    students[index] = student;
  } else {
    students.push(student);
  }
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
};

export const deleteStudent = (id: string): void => {
  const students = getStudents();
  const filtered = students.filter(s => s.id !== id);
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(filtered));
};

export const getFees = (): FeeRecord[] => {
  const data = localStorage.getItem(FEES_KEY);
  return data ? JSON.parse(data) : [];
};
