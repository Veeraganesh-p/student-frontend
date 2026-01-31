import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Problems.css";

function Problems() {
  const [problems, setProblems] = useState([]);

  const fetchProblems = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/problems`)
      .then((res) => res.json())
      .then((data) => setProblems(data))
      .catch((err) => {
        console.error(err);
        alert('Error loading problems.');
      });
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="problems-page">
      <div className="problems-header">
        <h2>Company Problems</h2>
      </div>

      <div className="problems-grid">
        {problems.length === 0 ? (
          <p>No problems posted yet</p>
        ) : (
          problems.map((problem) => (
            <div key={problem._id} className="problem-card">
              <h3>{problem.title}</h3>
              <p>{problem.description}</p>
              <p className="budget">Budget: ₹{problem.budget}</p>
              <p className="deadline">Deadline: {new Date(problem.deadline).toLocaleDateString()}</p>
              <Link to={`/submit-solution/${problem._id}`} className="solution-btn">
                Submit Solution
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Problems;