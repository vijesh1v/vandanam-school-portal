import React, { useState } from 'react';
import { Menu, X, GraduationCap, LogIn, LayoutDashboard, Home, Phone, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom'; // Will use HashRouter in App
import { UserRole } from '../types';
import { SCHOOL_NAME, CONTACT_EMAIL } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onLogout: () => void;
  userRole?: UserRole;
}

const Layout: React.FC<LayoutProps> = ({ children, isAuthenticated, onLogout, userRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) => `
    flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors
    ${isActive(path) 
      ? 'bg-brand-700 text-white shadow-sm' 
      : 'text-brand-100 hover:bg-brand-800 hover:text-white'}
  `;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="bg-brand-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-full">
                <GraduationCap className="h-6 w-6 text-brand-900" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                {SCHOOL_NAME}
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-4">
              <Link to="/" className={navLinkClass('/')}>
                <Home size={16} /> Home
              </Link>
              {!isAuthenticated && (
                <>
                  <Link to="/about" className={navLinkClass('/about')}>
                    <Info size={16} /> About
                  </Link>
                  <Link to="/admissions" className={navLinkClass('/admissions')}>
                    <Phone size={16} /> Admissions
                  </Link>
                </>
              )}
              
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" className={navLinkClass('/dashboard')}>
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <Link to="/students" className={navLinkClass('/students')}>
                    <GraduationCap size={16} /> Student Corner
                  </Link>
                </>
              )}
            </nav>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <button 
                  onClick={onLogout}
                  className="bg-brand-800 hover:bg-brand-700 px-4 py-2 rounded-md text-sm font-semibold transition-colors border border-brand-700"
                >
                  Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-md transition-transform hover:scale-105 flex items-center gap-2"
                >
                  <LogIn size={16} /> Portal Login
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-brand-100 hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-brand-800 border-t border-brand-700 pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/')}>
                Home
              </Link>
              {!isAuthenticated && (
                <>
                  <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/about')}>
                    About
                  </Link>
                  <Link to="/admissions" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/admissions')}>
                    Admissions
                  </Link>
                </>
              )}
              {isAuthenticated && (
                <>
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/dashboard')}>
                    Dashboard
                  </Link>
                  <Link to="/students" onClick={() => setIsMobileMenuOpen(false)} className={navLinkClass('/students')}>
                    Student Corner
                  </Link>
                </>
              )}
              <div className="pt-4 border-t border-brand-700 mt-4">
                {isAuthenticated ? (
                  <button 
                    onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                    className="w-full text-left px-3 py-2 text-brand-100 hover:bg-brand-700 hover:text-white rounded-md"
                  >
                    Logout
                  </button>
                ) : (
                  <Link 
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-3 py-2 text-brand-100 hover:bg-brand-700 hover:text-white rounded-md"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">{SCHOOL_NAME}</h3>
            <p className="text-sm leading-relaxed">
              Fostering a community of lifelong learners, critical thinkers, and compassionate global citizens.
            </p>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Admissions</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>123 Education Lane, Knowledge City</li>
              <li>+91 987 654 3210</li>
              <li>{CONTACT_EMAIL}</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-slate-800 text-center text-xs">
          &copy; {new Date().getFullYear()} {SCHOOL_NAME}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;