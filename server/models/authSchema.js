const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 10,
  },
});

const authModel = mongoose.model("User", authSchema);

module.exports = authModel;
