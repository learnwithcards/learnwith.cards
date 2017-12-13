import React from 'react'

const Dashboard = ({ user, onLogout }) => (
  <div>
    Hello {user.name}!<br />
    <button onClick={onLogout}>Log out</button>
  </div>
)

export default Dashboard
