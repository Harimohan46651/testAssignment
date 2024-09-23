import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import UserList from './components/UserList'
import useAuth from './components/useAuth'

function App() {
  const isAuthenticated = useAuth()

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/users" />: <Signup />} />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/users" /> : <Login />}
          />
          <Route
            path="/users"
            element={isAuthenticated ? <UserList /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
