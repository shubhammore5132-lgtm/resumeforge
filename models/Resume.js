const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Resume", resumeSchema);