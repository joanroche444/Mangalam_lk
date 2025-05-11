import axios from 'axios';

const API_URL = 'http://localhost:5000/api/admin';

// Create axios instance with auth header
const createAxiosInstance = () => {
  const token = localStorage.getItem('adminToken');
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

// Get users report
export const getUsersReport = async (filters) => {
  const api = createAxiosInstance();
  
  // Convert dates to ISO strings if they exist
  const queryParams = new URLSearchParams({
    startDate: filters.startDate ? filters.startDate.toISOString() : '',
    endDate: filters.endDate ? filters.endDate.toISOString() : '',
    role: filters.role || 'all',
    status: filters.status || 'all'
  });
  
  try {
    const response = await api.get(`/report/users?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch users report');
  }
};

// Get projects report
export const getProjectsReport = async (filters) => {
  const api = createAxiosInstance();
  
  const queryParams = new URLSearchParams({
    startDate: filters.startDate ? filters.startDate.toISOString() : '',
    endDate: filters.endDate ? filters.endDate.toISOString() : '',
    status: filters.status || 'all'
  });
  
  try {
    const response = await api.get(`/reports/projects?${queryParams}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to fetch projects report');
  }
};

export default {
  getUsersReport,
  getProjectsReport
};