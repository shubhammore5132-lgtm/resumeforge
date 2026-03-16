const Resume = require("../models/Resume");

// CREATE Resume
exports.createResume = async (req, res) => {
  try {
    const { title, summary, skills } = req.body;

    const resume = new Resume({
      title,
      summary,
      skills,
    });

    const savedResume = await resume.save();

    res.status(201).json(savedResume);
  } catch (error) {
    console.error("Create Resume Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET All Resumes
exports.getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    console.error("Fetch Resume Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// UPDATE Resume
exports.updateResume = async (req, res) => {
  try {
    const updated = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    console.error("Update Resume Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE Resume
exports.deleteResume = async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ message: "Resume deleted" });
  } catch (error) {
    console.error("Delete Resume Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};