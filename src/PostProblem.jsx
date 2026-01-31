import { useState } from "react";
import "./PostProblem.css";

function PostProblem() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: ''
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
      const response = await fetch(`${API_URL}/api/problems`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          budget: Number(formData.budget)
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Problem posted successfully!');
        setFormData({
          title: '',
          description: '',
          budget: '',
          deadline: ''
        });
        window.location.href = '/hr-dashboard';
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
      alert('Error posting problem');
    }
  };

  return (
    <div className="post-page">
      <div className="post-header">
        <h2>Post Company Problem</h2>
      </div>

      <div className="form-overlay">
        <div className="post-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Problem Title *"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Problem Description *"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <input
              type="number"
              name="budget"
              placeholder="Budget (₹) *"
              value={formData.budget}
              onChange={handleInputChange}
              required
            />
            <input
              type="date"
              name="deadline"
              placeholder="Deadline *"
              value={formData.deadline}
              onChange={handleInputChange}
              required
            />
            <div className="form-buttons">
              <button type="submit">Post Problem</button>
              <button type="button" onClick={() => window.location.href = '/hr-dashboard'}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostProblem;