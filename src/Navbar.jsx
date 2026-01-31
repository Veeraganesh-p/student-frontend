import {Link} from "react-router-dom";
import './Navbar.css'

function Navbar() {
    const userRole = localStorage.getItem('userRole');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('isLoggedIn');
        window.location.href = '/';
    };

    return (
        <nav className="nav">
            <div className="nav-logo">Student Idea Management</div>
            <div className="nav-links">
                {!isLoggedIn ? (
                    <Link to="/">Login</Link>
                ) : (
                    <>
                        {userRole === 'student' && (
                            <>
                                <Link to="/student-dashboard">Dashboard</Link>
                                <Link to="/problems">View Problems</Link>
                            </>
                        )}
                        {userRole === 'hr' && (
                            <>
                                <Link to="/hr-dashboard">HR Dashboard</Link>
                                <Link to="/post-problem">Post Problem</Link>
                            </>
                        )}
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}
export default Navbar