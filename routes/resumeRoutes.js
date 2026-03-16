const express = require("express");
const router = express.Router();

const {
  createResume,
  getResumes,
  deleteResume,
  updateResume,
} = require("../controllers/resumeController");

router.post("/", createResume);
router.get("/", getResumes);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

module.exports = router;
