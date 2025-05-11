
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/mangalamlogo.png';

//import { Star , User} from 'lucide-react';


const Navbar = () => {
  return (
    <nav className="w-full py-4 px-6 flex items-center justify-between bg-[#f9efe7] shadow-md">
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

    {/* Auth Links */}
    <div className="flex items-center space-x-6">
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
    </div>
  </nav>
  )
}
=======
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import Notification from './Notification';
import logo from '../assets/logoMangalam.png';

const Navbar = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutNotification, setShowLogoutNotification] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const handleLogout = async () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    setShowLogoutNotification(true);
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Scroll effect with enhanced transition
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
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user?.lastName) return user.lastName.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return '';
  };

  // Get username safely
  const getUsername = () => {
    if (user?.firstName) return user.firstName;
    if (user?.email) return user.email.split('@')[0];
    return '';
  };

  // Navigation links
  const navLinks = [
    { to: "/budget", text: "Budget" },
    { to: "/venue", text: "Venue" },
    { to: "/guests", text: "Guests" },
    { to: "/vendors", text: "Vendors" }
  ];

  // User menu items
  const userMenuItems = [
    { to: "/", text: "Home" },
    { to: "/my-projects", text: "My Projects" },
    { to: "/find-vendors", text: "Find Vendors" },
    { to: "/ideas-advice", text: "Ideas & Advice" },
    { to: "/profile", text: "Your Profile" }
  ];

  return (
    <>
      <nav 
        className={`fixed w-full py-2 md:py-4 px-4 md:px-6 flex items-center justify-between transition-all duration-300 z-40 ${
          scrolled 
            ? 'bg-[#f9efe7] bg-opacity-95 shadow-md transform py-1 md:py-2' 
            : 'bg-[#f9efe7] shadow-sm'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center transform transition-transform duration-300 hover:scale-105">
            <img src={logo} alt="Mangalamalika" className="h-12 md:h-16" />
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-1 lg:space-x-8">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              className="relative px-3 py-2 text-[#b06a5d] font-semibold transition-all duration-300 group overflow-hidden"
            >
              <span className="relative z-10">{link.text}</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b06a5d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
          ))}
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4 md:space-x-6">
          {user ? (
            // Show user profile dropdown when logged in
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none group"
                aria-label="User menu"
              >
                {/* Profile Picture with animation */}
                <div className="w-8 h-8 rounded-full bg-[#b06a5d] flex items-center justify-center text-white transform transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                  {getUserInitial()}
                </div>
                <span className="text-[#b06a5d] font-medium hidden md:inline group-hover:text-[#8d5347] transition-colors duration-300">
                  {getUsername()}
                </span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 text-[#b06a5d] transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              {/* Dropdown Menu with animation */}
              {dropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform origin-top-right transition-all duration-300 animate-dropdown"
                  style={{animation: 'scaleIn 0.2s ease-out forwards'}}
                >
                  {userMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.to}
                      className="block px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7] transition-colors duration-200"
                      onClick={() => setDropdownOpen(false)}
                    >
                      {item.text}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-[#b06a5d] hover:bg-[#f9efe7] transition-colors duration-200"
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
                className="text-[#b06a5d] font-semibold hover:text-[#8d5347] transition duration-300 relative group hidden sm:inline-block"
              >
                <span>Login</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#b06a5d] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link
                to="/signup"
                className="relative overflow-hidden bg-[#b06a5d] text-white py-2 px-4 rounded-lg font-semibold transition duration-300 transform hover:translate-y-[-2px] hover:shadow-md"
              >
                <span className="relative z-10">Sign Up</span>
                <span className="absolute inset-0 bg-[#8d5347] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              </Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden flex items-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-between items-center p-1">
              <span className={`w-full h-0.5 bg-[#b06a5d] transition-all duration-300 ${mobileMenuOpen ? 'transform rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`w-full h-0.5 bg-[#b06a5d] transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-[#b06a5d] transition-all duration-300 ${mobileMenuOpen ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed top-[60px] left-0 right-0 bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="py-4 px-6 space-y-4">
          {/* Navigation Links */}
          <div className="space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                className="block py-2 text-[#b06a5d] font-semibold hover:bg-[#f9efe7] px-2 rounded transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
          </div>

          {/* User Links if logged in */}
          {user && (
            <div className="pt-2 border-t border-gray-200 space-y-2">
              {userMenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className="block py-2 text-[#b06a5d] font-semibold hover:bg-[#f9efe7] px-2 rounded transition duration-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.text}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="block w-full text-left py-2 text-[#b06a5d] font-semibold hover:bg-[#f9efe7] px-2 rounded transition duration-200"
              >
                Logout
              </button>
            </div>
          )}

          {/* Login/Signup for mobile if not logged in */}
          {!user && (
            <div className="pt-2 border-t border-gray-200 flex flex-col space-y-2">
              <Link
                to="/login"
                className="block py-2 text-[#b06a5d] font-semibold hover:bg-[#f9efe7] px-2 rounded transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block py-2 bg-[#b06a5d] text-white font-semibold text-center rounded transition duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logout Notification */}
      {showLogoutNotification && (
        <Notification 
          message="You have successfully logged out"
          type="success"
          onClose={() => setShowLogoutNotification(false)}
        />
      )}

      {/* CSS Animations */}
      <style jsx="true">{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideInTop {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .animate-dropdown {
          animation: scaleIn 0.2s ease-out forwards;
          transform-origin: top right;
        }
        
        @media (max-width: 768px) {
          .active-link::after {
            bottom: -4px;
            height: 2px;
          }
        }
      `}</style>
    </>
  );
};


export default Navbar;