import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const { user, dispatch } = useAuthContext();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    weddingDate: '',
    location: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          navigate('/login');
          return;
        }

        const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch user data');
        }

        setProfileData(data.user);
        setFormData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone || '',
          weddingDate: data.user.weddingDate ? new Date(data.user.weddingDate).toISOString().split('T')[0] : '',
          location: data.user.location || ''
        });
      } catch (err) {
        toast.error(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/user/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }

      // Update both profile data and auth context
      setProfileData(data.user);
      dispatch({ type: 'LOGIN', payload: { ...user, ...data.user } });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f9efe7]">
        <Navbar />
        <div className="container mx-auto px-4 py-16 pt-24 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-[#e0c9c3] rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-[#e0c9c3] rounded w-1/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#f9efe7]">
        <Navbar />
        <div className="container mx-auto px-4 py-16 pt-24 text-center">
          <p className="text-[#8d5347]">No profile data found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9efe7]">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 pt-24">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-32 h-32 rounded-full bg-[#b06a5d] flex items-center justify-center text-white text-5xl font-bold">
              {profileData.firstName.charAt(0)}
              {profileData.lastName.charAt(0)}
            </div>
            <div className="text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md"
                  />
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold text-[#8d5347] mb-2">
                    {profileData.firstName} {profileData.lastName}
                  </h1>
                  <p className="text-lg text-[#b06a5d]">{profileData.email}</p>
                  <p className="text-[#b06a5d]">
                    {profileData.phone || 'No phone number provided'}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Wedding Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#f0d9d3]">
              <h2 className="text-xl font-semibold text-[#8d5347]">Wedding Details</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#b06a5d] hover:text-[#8d5347] font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#b06a5d] mb-1">Wedding Date</label>
                    <input
                      type="date"
                      name="weddingDate"
                      value={formData.weddingDate}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#b06a5d] mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#b06a5d] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-[#b06a5d] text-[#b06a5d] rounded-lg hover:bg-[#f0d9d3] transition duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#b06a5d] text-white rounded-lg hover:bg-[#8d5347] transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-[#b06a5d] mb-1">Wedding Date</h3>
                  <p className="text-lg text-[#8d5347]">
                    {profileData.weddingDate ? 
                      new Date(profileData.weddingDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      }) : 
                      'Not set'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#b06a5d] mb-1">Location</h3>
                  <p className="text-lg text-[#8d5347]">
                    {profileData.location || 'Not specified'}
                  </p>
                </div>
              </div>
            )}
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
                  <p className="text-[#8d5347]">{profileData.email}</p>
                </div>
                <Link to="/change-email" className="text-[#b06a5d] hover:text-[#8d5347] font-medium">
                  Change
                </Link>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Password</h3>
                  <p className="text-[#8d5347]">••••••••</p>
                </div>
                <Link to="/change-password" className="text-[#b06a5d] hover:text-[#8d5347] font-medium">
                  Change
                </Link>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Account Type</h3>
                  <p className="text-[#8d5347] capitalize">{profileData.role}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#f0d9d3]">
              <Link 
                to={`/delete-account/${profileData._id}`}
                className="px-4 py-2 bg-[#f0d9d3] text-[#8d5347] rounded-lg hover:bg-[#e0c9c3] transition duration-300 font-medium"
              >
                Delete Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;