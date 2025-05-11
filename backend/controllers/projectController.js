const Project = require('../models/Project');

const createProject = async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
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

module.exports = {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
};
