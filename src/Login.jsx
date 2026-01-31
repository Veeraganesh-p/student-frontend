import { useState } from 'react';
import './Login.css';

function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const endpoint = isRegister ? `${API_URL}/api/register` : `${API_URL}/api/login`;
        
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (response.ok) {
                if (isRegister) {
                    alert('Registration successful! Please login.');
                    setIsRegister(false);
                } else {
                    localStorage.setItem('userRole', data.role);
                    localStorage.setItem('isLoggedIn', 'true');
                    alert('Login successful!');
                    
                    if (data.role === 'student') {
                        window.location.href = '/student-dashboard';
                    } else {
                        window.location.href = '/hr-dashboard';
                    }
                }
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Frontend error:', error);
            alert('Operation failed. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1>Student Idea Management System</h1>
                
                <div className="form-container">
                    <h2>{isRegister ? 'Register' : 'Login'}</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Role:</label>
                            <select 
                                name="role" 
                                value={formData.role} 
                                onChange={handleInputChange} 
                                required
                            >
                                <option value="">Select Role</option>
                                <option value="student">Student</option>
                                <option value="hr">HR</option>
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label>Email:</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <div className="form-group">
                            <label>Password:</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleInputChange} 
                                required 
                            />
                        </div>
                        
                        <button type="submit" className="submit-btn">
                            {isRegister ? 'Register' : 'Login'}
                        </button>
                    </form>
                    
                    <p>
                        {isRegister ? 'Already have an account?' : 'New user?'}{' '}
                        <a href="#" onClick={() => setIsRegister(!isRegister)}>
                            {isRegister ? 'Login here' : 'Register here'}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;