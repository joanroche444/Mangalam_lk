import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  // Sample user data - in a real app, this would come from your auth context or API
  const user = {
    name: "Jane Doe",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    weddingDate: "2024-06-15",
    location: "New York, NY",
    avatar: "JD" // Initials for the avatar
  };

  return (
    <div className="min-h-screen bg-[#f9efe7]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-32 h-32 rounded-full bg-[#b06a5d] flex items-center justify-center text-white text-5xl font-bold">
              {user.avatar}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-[#8d5347] mb-2">{user.name}</h1>
              <p className="text-lg text-[#b06a5d]">{user.email}</p>
              <p className="text-[#b06a5d]">{user.phone}</p>
            </div>
          </div>

          {/* Wedding Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#8d5347] mb-4 pb-2 border-b border-[#f0d9d3]">
              Wedding Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-[#b06a5d] mb-1">Wedding Date</h3>
                <p className="text-lg text-[#8d5347]">{new Date(user.weddingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-[#b06a5d] mb-1">Location</h3>
                <p className="text-lg text-[#8d5347]">{user.location}</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Link 
              to="/my-projects" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0d9d3] flex items-center justify-center text-[#b06a5d]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#8d5347]">My Projects</h3>
                  <p className="text-sm text-[#b06a5d]">View and manage your wedding projects</p>
                </div>
              </div>
            </Link>

            <Link 
              to="/vendors" 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0d9d3] flex items-center justify-center text-[#b06a5d]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#8d5347]">Vendors</h3>
                  <p className="text-sm text-[#b06a5d]">Manage your selected vendors</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-[#8d5347] mb-4 pb-2 border-b border-[#f0d9d3]">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Email Address</h3>
                  <p className="text-[#8d5347]">{user.email}</p>
                </div>
                <button className="text-[#b06a5d] hover:text-[#8d5347] font-medium">
                  Change
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Password</h3>
                  <p className="text-[#8d5347]">••••••••</p>
                </div>
                <button className="text-[#b06a5d] hover:text-[#8d5347] font-medium">
                  Change
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Phone Number</h3>
                  <p className="text-[#8d5347]">{user.phone}</p>
                </div>
                <button className="text-[#b06a5d] hover:text-[#8d5347] font-medium">
                  Change
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#f0d9d3]">
              <button className="px-4 py-2 bg-[#f0d9d3] text-[#8d5347] rounded-lg hover:bg-[#e0c9c3] transition duration-300 font-medium">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;