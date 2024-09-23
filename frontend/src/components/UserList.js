import React, { useState, useEffect } from 'react'
import axios from 'axios'

function UserList() {
  const [users, setUsers] = useState([])
  const [userEmail,setUserEmail] = useState("")
  const token = localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/users', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setUsers(res.data)
      } catch (error) {
        alert('Error retrieving users')
      }
    }
    fetchUsers()
  }, [token])

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  const handleChange = (e)=>{
    setUserEmail(e.target.value)
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    const res = await axios.get(`http://localhost:5000/users/${userEmail}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    console.log(res)
    setUsers(res.data)

  }
  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <br /><br />

        <input type="string" value={userEmail} onChange = {handleChange} placeholder='Search user by email'></input>
        <button onClick = {handleSubmit}>Submit</button>
      
      <table class="table">
        <thead>
          <tr>
            <th scope="col" >First Name</th>
            <th scope="col" >Last Name</th>
            <th scope="col" >Email</th>
            <th scope="col" >age</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td colspan="2" >{user.firstName}</td>
              <td colspan="2" >{user.lastName}</td>
              <td colspan="2" >{user.email}</td>
              <td colspan="2" >{user.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
