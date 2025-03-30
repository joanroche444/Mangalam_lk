import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../src/assets/mangalamlogo.png';

import { Star , User} from 'lucide-react';


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
        to="/budgetdash"
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
        to="/chatbot"
        className="text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300"
      >
        support
      </Link>
      <Link
        to="/AllService"
        className="text-[#b06a5d] hover:text-[#8d5347] font-semibold transition duration-300"
      >
        Vendors
      </Link>
    </div>

    {/* Auth Links */}
    <div className="flex items-center space-x-6">
      <Link
        to="/servdash"
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

export default Navbar;