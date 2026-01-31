import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-section">
        <div className="dashboard-text">
          <h1>Welcome to Student Dashboard</h1>
          <p>View company problems and submit your innovative solutions.</p>
          <Link to="/problems" className="register-btn">
            View Problems
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;