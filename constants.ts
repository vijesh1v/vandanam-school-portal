import { Student, FeeRecord, User, UserRole } from './types';

export const SCHOOL_NAME = "Vandanam School";
export const SCHOOL_TAGLINE = "Empowering Minds, Shaping Futures";
export const CONTACT_EMAIL = "admissions@vandanam.edu";

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    username: 'admin',
    name: 'Principal Sharma',
    role: UserRole.ADMIN,
    avatar: 'https://picsum.photos/seed/principal/200/200'
  }
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 's1',
    firstName: "Aarav",
    lastName: "Patel",
    grade: "10-A",
    dob: "2008-05-12",
    parentName: "Rajesh Patel",
    contactEmail: "rajesh@example.com",
    contactPhone: "+91 98765 43210",
    address: "123 Green Avenue, Mumbai",
    enrollmentDate: "2020-06-01",
    feeStatus: 'PAID',
    attendanceRate: 95,
    photoUrl: "https://picsum.photos/seed/aarav/200/200"
  },
  {
    id: 's2',
    firstName: "Diya",
    lastName: "Sharma",
    grade: "10-A",
    dob: "2008-08-22",
    parentName: "Meera Sharma",
    contactEmail: "meera@example.com",
    contactPhone: "+91 98765 12345",
    address: "45 Lotus Apartments, Delhi",
    enrollmentDate: "2020-06-01",
    feeStatus: 'PENDING',
    attendanceRate: 88,
    photoUrl: "https://picsum.photos/seed/diya/200/200"
  },
  {
    id: 's3',
    firstName: "Rohan",
    lastName: "Gupta",
    grade: "9-B",
    dob: "2009-02-14",
    parentName: "Suresh Gupta",
    contactEmail: "suresh@example.com",
    contactPhone: "+91 91234 56789",
    address: "789 Palm Grove, Bangalore",
    enrollmentDate: "2021-06-01",
    feeStatus: 'OVERDUE',
    attendanceRate: 72,
    photoUrl: "https://picsum.photos/seed/rohan/200/200"
  }
];

export const INITIAL_FEES: FeeRecord[] = [
  {
    id: 'f1',
    studentId: 's1',
    amount: 25000,
    dueDate: '2023-12-01',
    paidDate: '2023-11-28',
    status: 'PAID',
    description: 'Term 2 Tuition'
  },
  {
    id: 'f2',
    studentId: 's2',
    amount: 25000,
    dueDate: '2023-12-01',
    status: 'PENDING',
    description: 'Term 2 Tuition'
  }
];
