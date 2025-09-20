const Task = require("../models/taskSchema");

const getTask = async (req, res) => {
  try {
    const showtasks = await Task.find();
    res.status(200).json(showtasks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const singleTask = async (req, res) => {
  try {
    const { id } = req.params; //id is the endpoint of the url
    const task = await Task.findById(id);

    if (!task) {
      res.status(404).json({ error: `${id} is not found` });
      return;
    }
    res.status(200).json({ message: "found succesfully", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { task, description, dueDate, priority } = req.body;

    if (!task || !description || !dueDate || !priority) {
      res.status(404).json({ error: "Input required" });
      return;
    }

    const addTask = await Task.create({ task, description, dueDate, priority });
    res.status(201).json({ message: "created successfully", addTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const delTask = await Task.findByIdAndDelete(id);

    if (!delTask) {
      res.status(404).json({ error: error.message });
      return;
    }
    res.status(200).json({ message: "Deleted succesfully", delTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { task, description, dueDate, priority } = req.body;

    const updTask = await Task.findByIdAndUpdate(
      id,
      { $set: { task, description, dueDate, priority } },
      { new: true, runValidators: true }
    );

    if (!updTask) {
      res.status(404).json({ error: `${id} not found` });
      return;
    }
    res.status(200).json({ message: `Updated successfully`, updTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getTask,
  singleTask,
  createTask,
  deleteTask,
  updateTask,
};
