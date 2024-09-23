import React, { useState } from 'react'
import axios from 'axios'
import './bodyStyles.css'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:5000/login', formData)
      localStorage.setItem('token', res.data.token)
      navigate('/users')
      window.location.reload()
    } catch (error) {
      alert('Invalid credentials')
    }
  }

  const handleSignupRedirect = () => {
    navigate('/signup')
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
      <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
        <label htmlFor="email">email</label>
          <input name="email" className="form-control" type="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="form-group mb-3">
          <label htmlFor="email">password</label>
          <input name="password" className="form-control" type="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <br></br>
          Don't have an account? please Signup <br></br>
          <button type="button" className="btn btn-primary w-100" onClick={handleSignupRedirect}>Signup</button>

        </form>
      </div>
    </div>

  )
}

export default Login