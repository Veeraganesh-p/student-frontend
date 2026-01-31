import { useState, useEffect } from "react";
import "./HRDashboard.css";

function HRDashboard() {
  const [solutions, setSolutions] = useState([]);

  const fetchSolutions = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    fetch(`${API_URL}/api/solutions`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch solutions');
        }
        return res.json();
      })
      .then((data) => setSolutions(data))
      .catch((err) => {
        console.error(err);
        alert('Error loading solutions. Please check if the server is running.');
      });
  };

  useEffect(() => {
    fetchSolutions();
  }, []);

  return (
    <div className="hr-page">
      <div className="hr-header">
        <h2>Student Solutions</h2>
      </div>

      <div className="solutions-table">
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Team Leader</th>
              <th>Age</th>
              <th>Team Members</th>
              <th>Solution</th>
              <th>Implementation</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {solutions.length === 0 ? (
              <tr>
                <td colSpan="7" style={{textAlign: 'center'}}>No solutions submitted yet</td>
              </tr>
            ) : (
              solutions.map((solution) => (
                <tr key={solution.id}>
                  <td>{solution.problemTitle}</td>
                  <td>{solution.team_leader_name}</td>
                  <td>{solution.age}</td>
                  <td>{solution.total_members}</td>
                  <td className="text-truncate" title={solution.solution_description}>
                    {solution.solution_description}
                  </td>
                  <td className="text-truncate" title={solution.implementation_plan}>
                    {solution.implementation_plan}
                  </td>
                  <td>{new Date(solution.created_at).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HRDashboard;