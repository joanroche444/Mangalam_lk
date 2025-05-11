import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logoMangalam.png';

const AdminHeader = ({ adminInfo, handleLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 md:px-8 py-4 flex justify-between items-center">
        {/* Left: Logo (Mobile Only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#b06a5d] p-2"
          >
            {mobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <img src={logo} alt="Mangalam Logo" className="h-8 ml-3" />
        </div>
        
        {/* Center: Title */}
        <div className="flex-1 flex justify-center md:justify-start">
          <h1 className="text-xl font-bold text-[#8d5347]">Admin Dashboard</h1>
        </div>
        
        {/* Right: Admin Profile */}
        <div className="flex items-center">
          {/* View Site Link */}
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-[#b06a5d] mr-6 hidden md:block"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Site
          </Link>
          
          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#f9efe7] flex items-center justify-center text-[#b06a5d] font-bold mr-2">
                {adminInfo?.name ? adminInfo.name.charAt(0) : 'A'}
              </div>
              <span className="text-sm font-medium text-gray-700 hidden md:block">
                {adminInfo?.name || adminInfo?.email || 'Admin'}
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                <div className="px-4 py-2 text-xs text-gray-500">
                  Logged in as: <span className="font-medium">{adminInfo?.role || 'Admin'}</span>
                </div>
                <Link
                  to="/admin-profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Your Profile
                </Link>
                <Link
                  to="/admin-settings"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <nav className="px-4 py-3">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/admin-dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-users"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-projects"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/admin-settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Site
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;