const Schedule = require('../models/Schedule');

const createSchedule = async (req, res) => {
  try {
    const schedule = new Schedule(req.body);
    await schedule.save();
    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const mongoose = require("mongoose");

const getSchedules = async (req, res) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    return res.status(400).json({ error: "Invalid projectId format" });
  }

  try {
    const schedules = await Schedule.find({ projectId });
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteSchedule = async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.json({ message: "Schedule deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createSchedule,
  getAllSchedules,
  getSchedules,
  deleteSchedule,
};
