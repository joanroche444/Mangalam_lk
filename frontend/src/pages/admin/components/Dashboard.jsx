import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: {
      total: 0,
      active: 0,
      couples: 0,
      vendors: 0
    },
    projects: {
      total: 0,
      active: 0
    }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard stats
    const fetchStats = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        
        // Simulating stats since your backend might not have this endpoint yet
        // In a real app, you'd fetch this from your API
        setTimeout(() => {
          setStats({
            users: {
              total: 42,
              active: 38,
              couples: 30,
              vendors: 12
            },
            projects: {
              total: 25,
              active: 18
            }
          });
          setIsLoading(false);
        }, 1000);
        
        // Uncomment this when your backend is ready
        /*
        const response = await fetch('http://localhost:5000/api/admin/stats', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats');
        }
        
        const data = await response.json();
        setStats(data);
        */
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#b06a5d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#8d5347]">Dashboard</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.users.total}</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            {stats.users.active} active users
          </div>
        </div>
        
        {/* Couples Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-pink-100 text-pink-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Couples</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.users.couples}</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {Math.round((stats.users.couples / stats.users.total) * 100)}% of users
          </div>
        </div>
        
        {/* Vendors Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Vendors</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.users.vendors}</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {Math.round((stats.users.vendors / stats.users.total) * 100)}% of users
          </div>
        </div>
        
        {/* Projects Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Projects</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.projects.total}</h3>
            </div>
          </div>
          <div className="mt-2 text-sm text-green-600">
            {stats.projects.active} active projects
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-[#8d5347] mb-4">Recent Activity</h3>
        
        <div className="space-y-4">
          {/* This would typically be populated from your backend */}
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Today at 10:30 AM</p>
            <p className="text-gray-800">New user registered: <span className="font-medium">John Smith</span></p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Yesterday at 3:45 PM</p>
            <p className="text-gray-800">New project created: <span className="font-medium">Smith-Johnson Wedding</span></p>
          </div>
          
          <div className="border-l-4 border-yellow-500 pl-4 py-2">
            <p className="text-sm text-gray-600">Yesterday at 1:22 PM</p>
            <p className="text-gray-800">Vendor account approved: <span className="font-medium">Elegant Flowers</span></p>
          </div>
          
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <p className="text-sm text-gray-600">2 days ago at 5:15 PM</p>
            <p className="text-gray-800">User password changed: <span className="font-medium">Emily Davis</span></p>
          </div>
        </div>
        
        <button className="mt-4 text-[#b06a5d] hover:text-[#8d5347] text-sm font-medium">
          View All Activity →
        </button>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-[#8d5347] mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Add New User</span>
          </button>
          
          <button className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 rounded-full bg-green-100 text-green-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </div>
            <span className="text-gray-700">View System Status</span>
          </button>
          
          <button className="flex items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
            <div className="p-2 rounded-full bg-red-100 text-red-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Check Pending Issues</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;