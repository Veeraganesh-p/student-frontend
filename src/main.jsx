import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import './App.css'
import Login from './Login.jsx'
import Navbar from './Navbar.jsx'
import StudentDashboard from './StudentDashboard.jsx'
import Problems from './Problems.jsx'
import SubmitSolution from './SubmitSolution.jsx'
import HRDashboard from './HRDashboard.jsx'
import PostProblem from './PostProblem.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/student-dashboard' element={<StudentDashboard />} />
      <Route path='/problems' element={<Problems />} />
      <Route path='/submit-solution/:problemId' element={<SubmitSolution />} />
      <Route path='/hr-dashboard' element={<HRDashboard />} />
      <Route path='/post-problem' element={<PostProblem />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)