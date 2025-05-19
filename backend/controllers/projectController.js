const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    // Get the user ID from the authenticated user
    const userId = req.user._id;
    
    // Create a new project with the user ID included
    const projectData = {
      ...req.body,
      userId // Assign the project to the logged-in user
    };
    
    const project = new Project(projectData);
    await project.save();
    
    res.status(201).json(project);
  } catch (err) {
    console.error('Project creation error:', err);
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const updated = await Project.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

const deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};

const getUserProjects = async (req, res) => {
  try {
    const userId = req.user._id;
    const projects = await Project.find({ userId })
      .sort({ date: -1 }) // Sort by date (newest first)
      .lean();
      
    res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching user projects:', err);
    res.status(500).json({ error: 'Server error while fetching user projects' });
  }
};

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getUserProjects
};