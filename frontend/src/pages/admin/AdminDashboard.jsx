// pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../assets/logoMangalam.png';

// Component imports
import AdminSidebar from './components/AdminSidebar';
import Dashboard from './components/Dashboard';
import AdminHeader from './components/AdminHeader';
import UserManagement from './components/UserManagement';
import Reports from './components/Reports';
//import Projects from './components/Projects';
//import Settings from './components/Settings';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [adminInfo, setAdminInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check admin authentication
    const adminToken = localStorage.getItem('adminToken');
    const storedAdminInfo = localStorage.getItem('adminInfo');
    
    if (!adminToken) {
      toast.error('Please log in to access the admin dashboard');
      navigate('/admin-login');
      return;
    }
    
    if (storedAdminInfo) {
      setAdminInfo(JSON.parse(storedAdminInfo));
    }
    
    // Verify admin token with backend
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
        
        if (!response.ok) {
          // Token is invalid
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminInfo');
          toast.error('Your session has expired. Please log in again.');
          navigate('/admin-login');
        }
      } catch (error) {
        console.error('Admin verification error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyToken();
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('Admin logged out successfully');
    navigate('/admin-login');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#b06a5d] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#8d5347] font-medium">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleLogout={handleLogout}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader adminInfo={adminInfo} handleLogout={handleLogout} />
        
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'reports' && <Reports/>}
          {activeTab === 'projects' && <Projects />}
          {activeTab === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;