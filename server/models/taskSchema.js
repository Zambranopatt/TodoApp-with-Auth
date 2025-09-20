const mongoose = require(`mongoose`);
const taskSchema = mongoose.Schema(
  {
    task: {
      type: String, //called field definition or field schema
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      default: "low",
      lowercase: true,
      enum: ["low", "medium", "high"],
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
