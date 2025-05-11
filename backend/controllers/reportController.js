const User = require('../models/userModel');
//const Project = require('../models/Project');
const moment = require('moment-timezone');

// Get user reports
const getUserReports = async (req, res) => {
  try {
    const { startDate, endDate, role, status } = req.query;
    
    // Build filter object
    const filter = {};
    

    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    

    if (role && role !== 'all') {
      filter.role = role;
    }
    
 
    if (status && status !== 'all') {
      filter.isActive = status === 'active';
    }
    
    // Get users with filters
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 });
    
    // Get statistics
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: { $ne: false } });
    const coupleUsers = await User.countDocuments({ role: 'couple' });
    const vendorUsers = await User.countDocuments({ role: 'vendor' });
    const adminUsers = await User.countDocuments({ role: 'admin' });
    
    // Get user registration stats by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const userGrowth = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    // Format for easier frontend consumption
    const userGrowthFormatted = userGrowth.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count
    }));
    
    // Get latest user registrations (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentUsers = await User.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    
    // Send response
    res.status(200).json({
      users,
      stats: {
        total: {
          users: totalUsers,
          active: activeUsers,
          couples: coupleUsers,
          vendors: vendorUsers,
          admins: adminUsers,
          recentRegistrations: recentUsers
        },
        growth: userGrowthFormatted
      }
    });
  } catch (error) {
    console.error('Get user reports error:', error);
    res.status(500).json({ error: 'Server error while generating report' });
  }
};

// Get projects report
const getProjectsReport = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Add date range filter if provided
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    
    // Add status filter if not 'all'
    if (status && status !== 'all') {
      filter.status = status;
    }
    
    // Get projects with filters
    const projects = await Project.find(filter)
      .sort({ createdAt: -1 });
    
    // Get project statistics
    const totalProjects = await Project.countDocuments();
    const activeProjects = await Project.countDocuments({ status: 'active' });
    const completedProjects = await Project.countDocuments({ status: 'completed' });
    
    // Get project creation stats by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    
    const projectGrowth = await Project.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]);
    
    // Format for easier frontend consumption
    const projectGrowthFormatted = projectGrowth.map(item => ({
      month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
      count: item.count
    }));
    
    // Send response
    res.status(200).json({
      projects,
      stats: {
        total: {
          projects: totalProjects,
          active: activeProjects,
          completed: completedProjects
        },
        growth: projectGrowthFormatted
      }
    });
  } catch (error) {
    console.error('Get projects report error:', error);
    res.status(500).json({ error: 'Server error while generating projects report' });
  }
};

module.exports = {
  getUserReports,
  getProjectsReport
};