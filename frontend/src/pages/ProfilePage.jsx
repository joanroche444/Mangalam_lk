import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import Navbar from '../components/Navbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom styled toast configuration
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  style: {
    borderRadius: '10px',
    background: '#fff',
    color: '#8d5347',
  }
};

// Custom styled confirm dialog component
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={() => onClose()}
    >
      <div 
        className="bg-white rounded-lg p-6 shadow-xl max-w-md w-full mx-4 transform transition-all"
        style={{ animation: 'scaleIn 0.2s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-[#8d5347] mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-[#b06a5d] text-[#b06a5d] rounded-lg hover:bg-[#f0d9d3] transition duration-300"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-[#b06a5d] text-white rounded-lg hover:bg-[#8d5347] transition duration-300"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

// Custom modal component with animations
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
      onClick={() => onClose()}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 transform transition-all"
        style={{ animation: 'slideIn 0.3s ease-out' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#8d5347]">{title}</h2>
            <button 
              onClick={() => onClose()}
              className="text-gray-400 hover:text-[#8d5347] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

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

  // Email change states
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  
  // Confirmation dialog state
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
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
          weddingDate: data.user.weddingDate || '',
          location: data.user.location || ''
        });
      } catch (err) {
        toast.error(err.message, toastConfig);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  const handleDelete = async () => {
    // Open confirmation dialog instead of using window.confirm
    setConfirmDialog({
      isOpen: true,
      title: 'Delete Account',
      message: 'Are you sure you want to delete your account? This action cannot be undone.',
      onConfirm: async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/user/delete/${user._id}`, {
            method: 'DELETE',
            headers: {
              "Authorization": `Bearer ${user.token}`
            }
          });

          if(response.ok) {
            dispatch({ type: 'LOGOUT' });
            localStorage.removeItem('user');
            toast.success('Account deleted successfully', toastConfig);
            navigate('/signup');
          } else {
            try {
              const errorData = await response.json();
              toast.error(errorData.error || 'Failed to delete account', toastConfig);
            } catch(parseError) {
              toast.error('Failed to delete account', toastConfig);
            }
          }
        } catch (error) {
          console.error('Error deleting account:', error);
          toast.error('Failed to delete account', toastConfig);
        }
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Format date properly if it exists
      const updatedFormData = {
        ...formData,
        // Ensure weddingDate is properly formatted if it exists
        weddingDate: formData.weddingDate ? new Date(formData.weddingDate).toISOString() : undefined
      };
      
      console.log("Submitting data:", updatedFormData); // Debug log
      
      const response = await fetch(`http://localhost:5000/api/user/update/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(updatedFormData)
      });
      
      // Log the raw response for debugging
      const rawResponseText = await response.text();
      let data;
      
      try {
        // Try to parse the response as JSON
        data = JSON.parse(rawResponseText);
      } catch (parseError) {
        console.error("Failed to parse response as JSON:", rawResponseText);
        throw new Error("Invalid response from server");
      }
  
      if (!response.ok) {
        console.error("Error response:", data);
        throw new Error(data.error || 'Failed to update profile');
      }
  
      // Update both profile data and auth context
      setProfileData(data.user);
      
      // Make sure we're updating the auth context with the correct data structure
      dispatch({ 
        type: 'LOGIN', 
        payload: { 
          ...user, 
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          phone: data.user.phone,
          weddingDate: data.user.weddingDate,
          location: data.user.location
        } 
      });
      
      setIsEditing(false);
      toast.success('Profile updated successfully!', toastConfig);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err.message || 'Failed to update profile', toastConfig);
    }
  };

  // New handler for email change
  const handleEmailChange = async (e) => {
    e.preventDefault();
    setIsSubmittingEmail(true);
    
    try {
      // Validate the new email
      if (!newEmail || !emailPassword) {
        toast.error('All fields are required', toastConfig);
        setIsSubmittingEmail(false);
        return;
      }
      
      // Simple email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newEmail)) {
        toast.error('Please enter a valid email address', toastConfig);
        setIsSubmittingEmail(false);
        return;
      }
      
      // Make API call to update email
      const response = await fetch(`http://localhost:5000/api/user/change-email/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          newEmail,
          password: emailPassword
        })
      });
      
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Invalid response from server');
      }
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update email');
      }
      
      // Update local state and context
      setProfileData({
        ...profileData,
        email: newEmail
      });
      
      dispatch({ 
        type: 'LOGIN', 
        payload: { 
          ...user, 
          email: newEmail
        } 
      });
      
      // Reset form and close modal
      setNewEmail('');
      setEmailPassword('');
      setIsEditingEmail(false);
      
      toast.success('Email updated successfully!', {
        ...toastConfig,
        icon: '✉️'
      });
    } catch (err) {
      console.error('Email update error:', err);
      toast.error(err.message || 'Failed to update email', toastConfig);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const resetEmailForm = () => {
    setNewEmail('');
    setEmailPassword('');
    setIsEditingEmail(false);
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
            <div className="w-32 h-32 rounded-full bg-[#b06a5d] flex items-center justify-center text-white text-5xl font-bold transform hover:scale-105 transition-transform duration-300">
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
                    className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
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
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 transform transition-all duration-300 hover:shadow-lg">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#f0d9d3]">
              <h2 className="text-xl font-semibold text-[#8d5347]">Wedding Details</h2>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="text-[#b06a5d] hover:text-[#8d5347] font-medium transition-colors px-4 py-1 rounded hover:bg-[#f9efe7]"
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
                      className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#b06a5d] mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
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
                    className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
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
                    className="px-4 py-2 bg-[#b06a5d] text-white rounded-lg hover:bg-[#8d5347] transition duration-300 flex items-center"
                  >
                    <span>Save Changes</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
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
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:translate-y-[-2px]"
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
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 transform hover:translate-y-[-2px]"
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
          <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-semibold text-[#8d5347] mb-4 pb-2 border-b border-[#f0d9d3]">
              Account Settings
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-2 hover:bg-[#f9efe7] rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Email Address</h3>
                  <p className="text-[#8d5347]">{profileData.email}</p>
                </div>
                <button 
                  onClick={() => setIsEditingEmail(true)}
                  className="text-[#b06a5d] hover:text-[#8d5347] font-medium px-4 py-1 rounded hover:bg-white transition-colors"
                >
                  Change
                </button>
              </div>
              
              <div className="flex justify-between items-center p-2 hover:bg-[#f9efe7] rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Password</h3>
                  <p className="text-[#8d5347]">••••••••</p>
                </div>
                <Link 
                  to="/change-password" 
                  className="text-[#b06a5d] hover:text-[#8d5347] font-medium px-4 py-1 rounded hover:bg-white transition-colors"
                >
                  Change
                </Link>
              </div>
              
              <div className="flex justify-between items-center p-2 hover:bg-[#f9efe7] rounded-lg transition-colors">
                <div>
                  <h3 className="font-medium text-[#b06a5d]">Account Type</h3>
                  <p className="text-[#8d5347] capitalize">{profileData.role}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#f0d9d3]">
              <button 
                onClick={handleDelete}
                className="px-4 py-2 bg-[#f0d9d3] text-[#8d5347] rounded-lg hover:bg-[#e0c9c3] transition duration-300 font-medium flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Confirm Dialog */}
      <ConfirmDialog 
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({...confirmDialog, isOpen: false})}
        onConfirm={confirmDialog.onConfirm}
        title={confirmDialog.title}
        message={confirmDialog.message}
      />

      {/* Email Change Modal */}
      <Modal
        isOpen={isEditingEmail}
        onClose={resetEmailForm}
        title="Change Email Address"
      >
        <form onSubmit={handleEmailChange} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#b06a5d] mb-1">Current Email</label>
            <div className="p-2 bg-[#f9efe7] rounded-md text-gray-700">{profileData.email}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#b06a5d] mb-1">New Email Address</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#b06a5d] mb-1">Confirm Password</label>
            <input
              type="password"
              value={emailPassword}
              onChange={(e) => setEmailPassword(e.target.value)}
              className="block w-full px-3 py-2 border border-[#b06a5d] rounded-md focus:ring-2 focus:ring-[#b06a5d] focus:ring-opacity-50 transition-all"
              required
            />
            <p className="text-xs text-gray-500 mt-1">For security, please enter your password to confirm this change.</p>
          </div>
          <div className="flex justify-end space-x-4 pt-2">
            <button
              type="button"
              onClick={resetEmailForm}
              className="px-4 py-2 border border-[#b06a5d] text-[#b06a5d] rounded-lg hover:bg-[#f0d9d3] transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmittingEmail}
              className="px-4 py-2 bg-[#b06a5d] text-white rounded-lg hover:bg-[#8d5347] transition duration-300 disabled:opacity-50 flex items-center"
            >
              {isSubmittingEmail ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <span>Update Email</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slideIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Custom Toast Container */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="rounded-lg shadow-md"
      />
    </div>
  );
};

export default ProfilePage;