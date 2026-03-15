import { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function App() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [skills, setSkills] = useState("");
  const [resumes, setResumes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5001/api/resumes";

  const fetchResumes = async () => {
    try {
      const res = await axios.get(API);
      setResumes(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const submitResume = async () => {
    const formattedSkills = skills
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, {
          title,
          summary,
          skills: formattedSkills,
        });
        setEditingId(null);
      } else {
        await axios.post(API, {
          title,
          summary,
          skills: formattedSkills,
        });
      }

      setTitle("");
      setSummary("");
      setSkills("");

      fetchResumes();
    } catch (error) {
      alert("Error saving resume");
    }
  };

  const deleteResume = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchResumes();
  };

  const editResume = (resume) => {
    setTitle(resume.title);
    setSummary(resume.summary);
    setSkills(resume.skills.join(", "));
    setEditingId(resume._id);
  };

  const downloadPDF = async (id) => {
    const element = document.getElementById(`resume-${id}`);

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();

    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Resume Builder</h1>

      <div className="card p-4 mb-5">
        <h4>{editingId ? "Edit Resume" : "Create Resume"}</h4>

        <input
          className="form-control mb-3"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="form-control mb-3"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />

        <input
          className="form-control mb-3"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        <button className="btn btn-primary" onClick={submitResume}>
          {editingId ? "Update Resume" : "Save Resume"}
        </button>
      </div>

      <h3 className="mb-4">Saved Resumes</h3>

      <div className="row">
        {resumes.length === 0 && <p>No resumes found</p>}

        {resumes.map((resume) => (
          <div className="col-md-4" key={resume._id}>
            <div className="card mb-4 p-3" id={`resume-${resume._id}`}>
              <h5>{resume.title}</h5>

              <p>{resume.summary}</p>

              <p>
                <strong>Skills:</strong> {resume.skills.join(", ")}
              </p>

              <div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => editResume(resume)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => deleteResume(resume._id)}
                >
                  Delete
                </button>

                <button
                  className="btn btn-success btn-sm ms-2"
                  onClick={() => downloadPDF(resume._id)}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;