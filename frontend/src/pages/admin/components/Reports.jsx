import React, { useState, useEffect } from 'react';
import { FaFilePdf, FaFileExcel, FaFilter, FaChartBar, FaUsers, FaCalendarAlt, FaProjectDiagram } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { toast } from 'react-toastify';
import reportService from '../../../services/reportService';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Reports = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: {
      users: 0,
      active: 0,
      couples: 0,
      vendors: 0,
      admins: 0,
      recentRegistrations: 0,
      projects: 0,
      activeProjects: 0
    },
    growth: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)), // Default to 1 month ago
    endDate: new Date(),
    role: 'all',
    status: 'all'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [reportType, setReportType] = useState('users');

  // Fetch report data based on filters and report type
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true);
      try {
        if (reportType === 'users') {
          console.log("Fetching user report with filters:", filters);
          const data = await reportService.getUsersReport(filters);
          console.log("Received user data:", data);
          
          if (data && data.users) {
            setUsers(data.users);
            setStats(data.stats || {
              total: {
                users: data.users.length,
                active: data.users.filter(u => u.isActive !== false).length,
                couples: data.users.filter(u => u.role === 'couple').length,
                vendors: data.users.filter(u => u.role === 'vendor').length,
                admins: data.users.filter(u => u.role === 'admin').length,
                recentRegistrations: 0
              },
              growth: []
            });
          } else {
            console.error("Invalid data format received from API:", data);
            toast.error("Received invalid data format from server");
          }
        } else if (reportType === 'projects') {
          // Skip projects fetch since endpoint doesn't exist yet
          // Will be uncommented when backend endpoint is ready
          // const data = await reportService.getProjectsReport(filters);
          
          // Display a toast indicating projects report is not ready yet
          toast.info("Projects report endpoint is not available yet");
          
          // Set mock data for now
          setUsers([]);
          setStats({
            total: {
              users: 0,
              active: 0,
              couples: 0,
              vendors: 0,
              admins: 0,
              recentRegistrations: 0,
              projects: 0,
              activeProjects: 0
            },
            growth: []
          });
        }
      } catch (error) {
        console.error(`Error fetching ${reportType} report:`, error);
        toast.error(`Failed to load ${reportType} report data`);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReportData();
  }, [reportType, filters]);

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Add report title and metadata
    const title = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`;
    const subtitle = `Date Range: ${filters.startDate.toLocaleDateString()} to ${filters.endDate.toLocaleDateString()}`;
    const timestamp = `Generated on: ${new Date().toLocaleString()}`;
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(139, 83, 71); // #8b5347
    doc.text(title, 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(subtitle, 105, 22, { align: 'center' });
    doc.text(timestamp, 105, 28, { align: 'center' });
    
    // Report summary
    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.text(`Summary`, 14, 40);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    
    if (reportType === 'users') {
      doc.text(`Total Users: ${stats.total.users}`, 14, 48);
      doc.text(`Active Users: ${stats.total.active}`, 14, 54);
      doc.text(`Couples: ${stats.total.couples}`, 14, 60);
      doc.text(`Vendors: ${stats.total.vendors}`, 14, 66);
      doc.text(`Admins: ${stats.total.admins}`, 14, 72);
      doc.text(`Recent Registrations (7 days): ${stats.total.recentRegistrations}`, 14, 78);
      
      // Create table data for users
      const tableColumn = ["Name", "Email", "Role", "Status", "Joined Date"];
      const tableRows = [];
      
      // Make sure we're actually processing user data
      console.log("Users data for PDF:", users);
      
      if (users && users.length > 0) {
        users.forEach(user => {
          // Log each user for debugging
          console.log("Processing user for PDF table:", user);
          
          const userData = [
            `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A',
            user.email || 'N/A',
            user.role || 'user',
            user.isActive !== false ? 'Active' : 'Inactive',
            user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'
          ];
          
          tableRows.push(userData);
        });
      } else {
        // Add a "no data" row if no users
        tableRows.push(['No user data available', '', '', '', '']);
      }
      
      // Add table to PDF
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 85,
        theme: 'striped',
        headStyles: { fillColor: [176, 106, 93] }, // #b06a5d
        margin: { top: 85 },
      });
    } else if (reportType === 'projects') {
      // Project report specific content
      doc.text(`Projects report functionality coming soon.`, 14, 48);
    }
    
    // Add page number at the bottom
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`Page ${i} of ${pageCount}`, 105, doc.internal.pageSize.height - 10, { align: 'center' });
    }
    
    // Add footer with company name
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text('Mangalam Wedding Planner', 105, doc.internal.pageSize.height - 5, { align: 'center' });
    
    // Save the PDF
    doc.save(`${reportType}_report_${new Date().toISOString().split('T')[0]}.pdf`);
    
    toast.success(`${title} exported successfully!`);
  };

  // Prepare chart data for user growth
  const prepareUserGrowthChart = () => {
    if (!stats.growth || stats.growth.length === 0) {
      return {
        labels: [],
        datasets: [{
          label: 'New Users',
          data: [],
          borderColor: '#b06a5d',
          backgroundColor: 'rgba(176, 106, 93, 0.1)',
          tension: 0.3
        }]
      };
    }
    
    // Format months for display
    const labels = stats.growth.map(item => {
      const [year, month] = item.month.split('-');
      return `${new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' })} ${year}`;
    });
    
    const data = stats.growth.map(item => item.count);
    
    return {
      labels,
      datasets: [{
        label: 'New Users',
        data,
        borderColor: '#b06a5d',
        backgroundColor: 'rgba(176, 106, 93, 0.1)',
        tension: 0.3,
        fill: true
      }]
    };
  };

  // Prepare chart data for user roles distribution
  const prepareUserRolesChart = () => {
    return {
      labels: ['Couples', 'Vendors', 'Admins'],
      datasets: [
        {
          data: [stats.total.couples, stats.total.vendors, stats.total.admins],
          backgroundColor: ['#b06a5d', '#d98d80', '#8d5347'],
          borderColor: ['#ffffff', '#ffffff', '#ffffff'],
          borderWidth: 1,
        },
      ],
    };
  };

  // UI for loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#b06a5d] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold text-[#8d5347] mb-4 md:mb-0">Report Generation</h2>
        
        {/* Report Type Selection */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setReportType('users')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              reportType === 'users' 
                ? 'bg-[#b06a5d] text-white' 
                : 'bg-white text-[#b06a5d] border border-[#b06a5d] hover:bg-[#f9efe7]'
            }`}
          >
            <FaUsers className="mr-2" />
            Users Report
          </button>
          
          <button
            onClick={() => setReportType('projects')}
            className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              reportType === 'projects' 
                ? 'bg-[#b06a5d] text-white' 
                : 'bg-white text-[#b06a5d] border border-[#b06a5d] hover:bg-[#f9efe7]'
            }`}
          >
            <FaProjectDiagram className="mr-2" />
            Projects Report
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-[#8d5347] flex items-center">
            <FaFilter className="mr-2" /> Report Filters
          </h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="text-[#b06a5d] hover:text-[#8d5347] font-medium text-sm"
          >
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <div className="relative">
                <DatePicker
                  selected={filters.startDate}
                  onChange={date => handleFilterChange('startDate', date)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#b06a5d] focus:border-[#b06a5d]"
                  maxDate={filters.endDate}
                />
                <div className="absolute right-2 top-2 text-gray-400 pointer-events-none">
                  <FaCalendarAlt />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <div className="relative">
                <DatePicker
                  selected={filters.endDate}
                  onChange={date => handleFilterChange('endDate', date)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#b06a5d] focus:border-[#b06a5d]"
                  minDate={filters.startDate}
                  maxDate={new Date()}
                />
                <div className="absolute right-2 top-2 text-gray-400 pointer-events-none">
                  <FaCalendarAlt />
                </div>
              </div>
            </div>
            
            {reportType === 'users' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Role</label>
                  <select
                    value={filters.role}
                    onChange={(e) => handleFilterChange('role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#b06a5d] focus:border-[#b06a5d]"
                  >
                    <option value="all">All Roles</option>
                    <option value="couple">Couples</option>
                    <option value="vendor">Vendors</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleFilterChange('status', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#b06a5d] focus:border-[#b06a5d]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </>
            )}
            
            {reportType === 'projects' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#b06a5d] focus:border-[#b06a5d]"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-[#8d5347]">Report Preview</h3>
          <div className="flex gap-2">
            <button
              onClick={generatePDF}
              className="flex items-center px-4 py-2 bg-[#b06a5d] text-white rounded-lg hover:bg-[#8d5347] transition-colors duration-300"
            >
              <FaFilePdf className="mr-2" />
              Export as PDF
            </button>
            <button
              className="flex items-center px-4 py-2 bg-white border border-[#b06a5d] text-[#b06a5d] rounded-lg hover:bg-[#f9efe7] transition-colors duration-300"
            >
              <FaFileExcel className="mr-2" />
              Export as Excel
            </button>
          </div>
        </div>
        
        {/* Report stats summary */}
        {reportType === 'users' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-2xl font-bold text-[#8d5347]">{stats.total.users}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{stats.total.active}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">New Users (7 days)</p>
                <p className="text-2xl font-bold text-blue-600">{stats.total.recentRegistrations}</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Date Range</p>
                <p className="text-md font-medium text-gray-700">
                  {filters.startDate.toLocaleDateString()} - {filters.endDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-md font-semibold text-[#8d5347] mb-2">User Growth (Last 6 Months)</h4>
                <div className="h-64">
                  <Line 
                    data={prepareUserGrowthChart()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h4 className="text-md font-semibold text-[#8d5347] mb-2">User Distribution by Role</h4>
                <div className="h-64">
                  <Pie 
                    data={prepareUserRolesChart()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                        },
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* User data table */}
            <h4 className="text-md font-semibold text-[#8d5347] mb-3">User Details</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Join Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.slice(0, 10).map((user, index) => (
                    <tr key={user._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-800' 
                            : user.role === 'vendor'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {user.role || 'user'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isActive !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.isActive !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                        No users found matching the selected filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {users.length > 10 && (
                <div className="py-3 px-6 border-t text-sm text-gray-500">
                  Showing 10 of {users.length} results. Export to PDF to see all results.
                </div>
              )}
            </div>
          </>
        )}
        
        {reportType === 'projects' && (
          <div className="text-center p-8 text-gray-500">
            Projects report functionality will be available soon.
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;