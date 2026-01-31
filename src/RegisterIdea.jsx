import { useState } from "react";
import "./RegisterIdea.css";

function RegisterIdea() {
  const [formData, setFormData] = useState({
    team_leader_name: '',
    age: '',
    amount_required: '',
    total_members: '',
    problem_statement: '',
    implementation_procedure: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.team_leader_name || !formData.age) {
      alert('Team leader name and age are required!');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/ideas", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          age: Number(formData.age),
          amount_required: Number(formData.amount_required) || 0,
          total_members: Number(formData.total_members) || 1
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Idea submitted successfully!');
        setFormData({
          team_leader_name: '',
          age: '',
          amount_required: '',
          total_members: '',
          problem_statement: '',
          implementation_procedure: ''
        });
        window.location.href = '/student-dashboard';
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting idea');
    }
  };

  const handleReset = () => {
    setFormData({
      team_leader_name: '',
      age: '',
      amount_required: '',
      total_members: '',
      problem_statement: '',
      implementation_procedure: ''
    });
  };

  return (
    <div className="register-page">
      <div className="register-header">
        <h2>Register New Idea</h2>
      </div>

      <div className="form-overlay">
        <div className="register-form">
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
              name="amount_required"
              placeholder="Amount Required for Project"
              value={formData.amount_required}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="total_members"
              placeholder="Total Members in Team"
              value={formData.total_members}
              onChange={handleInputChange}
            />
            <textarea
              name="problem_statement"
              placeholder="Problem Statement"
              value={formData.problem_statement}
              onChange={handleInputChange}
            />
            <textarea
              name="implementation_procedure"
              placeholder="Implementation Procedure"
              value={formData.implementation_procedure}
              onChange={handleInputChange}
            />
            <div className="form-buttons">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleReset}>Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterIdea;