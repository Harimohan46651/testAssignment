import React, { useState } from 'react'
import axios from 'axios'
import './bodyStyles.css'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', mobile: '', age: 0, password: '' })
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/signup', formData)
      alert('User registered successfully, pleaae login')
      navigate('/login')
    } catch (error) {
      alert('Error in registration')
    }
  }

  const handleLoginRedirect = () => {
    navigate('/login')
  }

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
      <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="firstName" className="col-sm-3 col-form-label">firstName:</label>
            <input name="firstName" type="text" placeholder="First Name" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="lastName" className="col-sm-3 col-form-label">lastName:</label>
           <input name="lastName" type="text" placeholder="Last Name" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="col-sm-3 col-form-label">email:</label>
            <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
        <label htmlFor="mobile" className="col-sm-3 col-form-label">Mobile:</label>
          <input name="mobile" type="text" placeholder="Mobile" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age" className="col-sm-3 col-form-label">age:</label>
           <input name="age" type="text" placeholder="age" onChange={handleChange} required />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="col-sm-3 col-form-label">password:</label>
            <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        </div>
          <button type="submit" className="btn btn-primary w-100">Signup</button>
          <br></br>
          Alredy have an account? please Login <br></br>
          <button type="button" className="btn btn-primary w-100" onClick={handleLoginRedirect}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Signup