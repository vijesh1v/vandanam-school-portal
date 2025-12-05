import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AIChat from './components/AIChat';
import StudentForm from './components/StudentForm';

// Icons
import { 
  Users, DollarSign, Calendar, TrendingUp, Search, 
  Trash2, Edit2, Plus, AlertCircle, CheckCircle, Clock
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

// Types & Data
import { User, Student, UserRole, FeeRecord } from './types';
import { MOCK_USERS, SCHOOL_NAME, SCHOOL_TAGLINE } from './constants';
import * as DataService from './services/dataService';

// --- Page Components ---

const HomePage: React.FC = () => (
  <div className="flex flex-col">
    {/* Hero */}
    <div className="relative bg-brand-900 text-white py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/school_bg/1920/1080')] bg-cover bg-center" />
      <div className="relative max-w-7xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Welcome to <span className="text-accent-500">{SCHOOL_NAME}</span>
        </h1>
        <p className="text-xl md:text-2xl text-brand-100 font-light max-w-2xl mx-auto">
          {SCHOOL_TAGLINE}
        </p>
        <div className="pt-8 flex justify-center gap-4">
          <a href="#features" className="px-8 py-3 bg-white text-brand-900 rounded-full font-bold shadow-lg hover:bg-brand-50 transition-colors">
            Discover More
          </a>
        </div>
      </div>
    </div>

    {/* Features */}
    <div id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center space-y-4 p-6 rounded-2xl hover:shadow-xl transition-shadow bg-slate-50">
          <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto">
            <Users size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Expert Faculty</h3>
          <p className="text-gray-600">Dedicated educators committed to nurturing every student's potential through personalized attention.</p>
        </div>
        <div className="text-center space-y-4 p-6 rounded-2xl hover:shadow-xl transition-shadow bg-slate-50">
          <div className="w-16 h-16 bg-accent-100 text-accent-600 rounded-full flex items-center justify-center mx-auto">
            <TrendingUp size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Holistic Growth</h3>
          <p className="text-gray-600">Beyond academics, we focus on sports, arts, and character building for well-rounded individuals.</p>
        </div>
        <div className="text-center space-y-4 p-6 rounded-2xl hover:shadow-xl transition-shadow bg-slate-50">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Modern Facilities</h3>
          <p className="text-gray-600">State-of-the-art labs, libraries, and sports complexes designed for the 21st century.</p>
        </div>
      </div>
    </div>
  </div>
);

const LoginPage: React.FC<{ onLogin: (u: User) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock Login
    if (username === 'admin' && password === 'admin') {
      onLogin(MOCK_USERS[0]);
    } else {
      setError('Invalid credentials (try admin/admin)');
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-500">Sign in to the Vandanam Portal</p>
        </div>
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" 
              placeholder="admin"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-md transition-colors"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-400">
          Only for authorized staff and students.
        </p>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  const students = DataService.getStudents();
  const totalStudents = students.length;
  const paidCount = students.filter(s => s.feeStatus === 'PAID').length;
  const overdueCount = students.filter(s => s.feeStatus === 'OVERDUE').length;
  
  const attendanceData = [
    { grade: 'Grade 8', rate: 92 },
    { grade: 'Grade 9', rate: 88 },
    { grade: 'Grade 10', rate: 95 },
    { grade: 'Grade 11', rate: 85 },
    { grade: 'Grade 12', rate: 90 },
  ];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800">Administrator Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Students</p>
              <p className="text-3xl font-bold text-brand-700 mt-1">{totalStudents}</p>
            </div>
            <div className="p-3 bg-brand-50 rounded-full text-brand-600"><Users /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Fees Collected</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{paidCount}</p>
              <p className="text-xs text-gray-400 mt-1">Students Paid</p>
            </div>
            <div className="p-3 bg-green-50 rounded-full text-green-600"><CheckCircle /></div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Fees Overdue</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{overdueCount}</p>
              <p className="text-xs text-gray-400 mt-1">Action Required</p>
            </div>
            <div className="p-3 bg-red-50 rounded-full text-red-600"><AlertCircle /></div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-6">Average Attendance by Grade</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="grade" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StudentCorner: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setStudents(DataService.getStudents());
  }, []);

  const handleSaveStudent = (student: Student) => {
    DataService.saveStudent(student);
    setStudents(DataService.getStudents());
    setIsModalOpen(false);
    setEditingStudent(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this student?')) {
      DataService.deleteStudent(id);
      setStudents(DataService.getStudents());
    }
  };

  const openEdit = (student: Student) => {
    setEditingStudent(student);
    setIsModalOpen(true);
  };

  const openNew = () => {
    setEditingStudent(null);
    setIsModalOpen(true);
  };

  const filteredStudents = students.filter(s => 
    s.lastName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Student Corner</h1>
          <p className="text-gray-500">Manage directory and fee status</p>
        </div>
        <button 
          onClick={openNew}
          className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-md transition-all"
        >
          <Plus size={18} /> Add Student
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center gap-3">
        <Search size={20} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or grade..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Fee Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredStudents.length > 0 ? filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img src={student.photoUrl} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-200" />
                      <div>
                        <div className="font-medium text-gray-900">{student.firstName} {student.lastName}</div>
                        <div className="text-xs text-gray-500">{student.contactEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">{student.grade}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold
                      ${student.feeStatus === 'PAID' ? 'bg-green-100 text-green-700' : 
                        student.feeStatus === 'PENDING' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {student.feeStatus === 'PAID' ? <CheckCircle size={12} /> : 
                       student.feeStatus === 'PENDING' ? <Clock size={12} /> : <AlertCircle size={12} />}
                      {student.feeStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center gap-2">
                       <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                         <div 
                           className="h-full bg-brand-500 rounded-full" 
                           style={{ width: `${student.attendanceRate}%`}}
                         />
                       </div>
                       <span className="text-xs text-gray-500 font-medium">{student.attendanceRate}%</span>
                     </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => openEdit(student)}
                        className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-full transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(student.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                    No students found. Add one to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <StudentForm 
          initialData={editingStudent} 
          onSave={handleSaveStudent} 
          onCancel={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    DataService.initializeData();
    // Check session logic here if implementing persistence
  }, []);

  const isAuthenticated = !!user;

  const handleLogout = () => setUser(null);

  return (
    <HashRouter>
      <Layout isAuthenticated={isAuthenticated} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<div className="p-12 text-center text-gray-600">About Page Content</div>} />
          <Route path="/admissions" element={<div className="p-12 text-center text-gray-600">Admissions Information</div>} />
          
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage onLogin={setUser} />
          } />
          
          <Route path="/dashboard" element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } />
          
          <Route path="/students" element={
            isAuthenticated ? <StudentCorner /> : <Navigate to="/login" />
          } />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
      <AIChat />
    </HashRouter>
  );
};

export default App;
