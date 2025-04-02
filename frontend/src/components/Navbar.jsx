import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Notification from './Notification';
import logo from '../assets/logoMangalam.png';

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = async () => {
    logout();
    setShowLogoutNotification(true);
    setTimeout(() => {
      navigate('/login');
    }, 2500); // Navigate after showing notification briefly
  };

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

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Get user initials safely
  const getUserInitial = () => {
    if (!user?.email) return '';
    return user.email.charAt(0).toUpperCase();
  };

  // Get username safely
  const getUsername = () => {
    if (!user?.email) return '';
    return user.email.split('@')[0];
  };

  return (
    <>
      <nav 
        className={`fixed w-full py-4 px-6 flex items-center justify-between bg-[#f9efe7] shadow-md transition-opacity duration-300 z-40 ${
          scrolled ? 'opacity-80' : 'opacity-100'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Mangalamalika" className="h-16" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            to="/budget"
            className="text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300"
          >
            Budget
          </Link>
          <Link
            to="/venue"
            className="text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300"
          >
            Venue
          </Link>
          <Link
            to="/guests"
            className="text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300"
          >
            Guests
          </Link>
          <Link
            to="/vendors"
            className="text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300"
          >
            Vendors
          </Link>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-6">
          {user ? (
            // Show user profile dropdown when logged in
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                {/* Profile Picture */}
                <div className="w-8 h-8 rounded-full bg-[#b06a5d] flex items-center justify-center text-white">
                  {getUserInitial()}
                </div>
                <span className="text-[#b06a5d] font-medium hidden md:inline">
                  {getUsername()}
                </span>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    to="/my-projects"
                    className="block px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    My Projects
                  </Link>
                  <Link
                    to="/find-vendors"
                    className="block px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Find Vendors
                  </Link>
                  <Link
                    to="/ideas-advice"
                    className="block px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Ideas & Advice
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7]"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Your Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Show login/signup when not logged in
            <>
              <Link
                to="/login"
                className="text-[#b06a5d] font-semibold hover:underline transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#b06a5d] text-white py-2 px-4 rounded-lg font-semibold hover:bg-[#8d5347] transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Logout Notification */}
      {showLogoutNotification && (
        <Notification 
          message="You have successfully logged out"
          type="success"
          onClose={() => setShowLogoutNotification(false)}
        />
      )}
    </>
  );
};

export default Navbar;