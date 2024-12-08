import React, { useState } from "react";
import axios from "axios";

function ShowTables() {
  const [users, setUsers] = useState([]);
  const [runs, setRuns] = useState([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setRuns([]); // Clear runs data when fetching users
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUsers(response.data);
      setError(""); // Clear any existing errors
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users.");
      setUsers([]); // Clear users if there's an error
    }
  };

  const fetchRuns = async () => {
    try {
      setUsers([]); // Clear users data when fetching runs
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/runs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setRuns(response.data);
      setError(""); // Clear any existing errors
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch runs.");
      setRuns([]); // Clear runs if there's an error
    }
  };

  return (
    <div>
      <h2>Tables</h2>
      <div>
        <button 
            onClick={fetchUsers} 
            style={{
                padding: '10px 20px',
                margin: '0 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: '1px solid #ccc',
            }}
        >
            Show Users
        </button>
        <button 
            onClick={fetchRuns}
            style={{
                padding: '10px 20px',
                margin: '0 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                border: '1px solid #ccc',
            }}
        >
            Show Runs
        </button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {users.length > 0 && (
        <div className="container">
          <h3>Users Table</h3>
          <table border="1" style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Total Runs</th>
                <th>Total Distance</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.totalRuns}</td>
                  <td>{user.totalDistance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {runs.length > 0 && (
        <div className="container">
          <h3>Runs Table</h3>
          <table border="1" style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Miles</th>
                <th>Location</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Average Pace</th>
              </tr>
            </thead>
            <tbody>
              {runs.map((run) => (
                <tr key={run.id}>
                  <td>{run.id}</td>
                  <td>{run.userId}</td>
                  <td>{run.miles}</td>
                  <td>{run.location}</td>
                  <td>{run.time_start}</td>
                  <td>{run.time_end}</td>
                  <td>{run.duration}</td>
                  <td>{run.date}</td>
                  <td>{run.averagePace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ShowTables;
