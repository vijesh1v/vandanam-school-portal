export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT',
  GUEST = 'GUEST'
}

export interface User {
  id: string;
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  grade: string;
  dob: string;
  parentName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  enrollmentDate: string;
  feeStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  attendanceRate: number; // Percentage 0-100
  photoUrl?: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'PAID' | 'PENDING' | 'OVERDUE';
  description: string; // e.g., "Term 1 Tuition"
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
