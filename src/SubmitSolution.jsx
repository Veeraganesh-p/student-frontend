import { useState } from "react";
import { useParams } from "react-router-dom";
import "./SubmitSolution.css";

function SubmitSolution() {
  const { problemId } = useParams();
  const [formData, setFormData] = useState({
    team_leader_name: '',
    age: '',
    total_members: '',
    solution_description: '',
    implementation_plan: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/solutions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          problemId,
          age: Number(formData.age),
          total_members: Number(formData.total_members) || 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Solution submitted successfully!');
        window.location.href = '/problems';
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting solution');
    }
  };

  return (
    <div className="submit-page">
      <div className="submit-header">
        <h2>Submit Solution</h2>
      </div>

      <div className="form-overlay">
        <div className="submit-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="team_leader_name"
              placeholder="Team Leader Name *"
              value={formData.team_leader_name}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="age"
              placeholder="Age *"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="total_members"
              placeholder="Total Team Members"
              value={formData.total_members}
              onChange={handleInputChange}
            />
            <textarea
              name="solution_description"
              placeholder="Solution Description *"
              value={formData.solution_description}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="implementation_plan"
              placeholder="Implementation Plan *"
              value={formData.implementation_plan}
              onChange={handleInputChange}
              required
            />
            <div className="form-buttons">
              <button type="submit">Submit Solution</button>
              <button type="button" onClick={() => window.location.href = '/problems'}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SubmitSolution;