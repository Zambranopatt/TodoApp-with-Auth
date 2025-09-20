const User = require("../models/authSchema");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "All inputs required" });
      return;
    }
    const existUsername = await User.findOne({ username });
    if (existUsername) {
      res.status(409).json({ error: "Invalid password" });
      return;
    }
    const hashPass = await bcrypt.hash(password, 10);
    const addUser = await User.create({ username, password: hashPass });
    res.status(201).json({ message: "Create succesfully", addUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ error: "All inputs is required" });
      return;
    }
    const findUser = await User.findOne({ username });
    if (!findUser) {
      res.status(404).json({ error: "Username not found" });
      return;
    }
    const comparePass = await bcrypt.compare(password, findUser.password);
    if (!comparePass) {
      res.status(400).json({ error: "Invalid password" });
      return;
    }
    res.status(200).json({ message: "Login succesfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  signUp,
  logIn,
};
