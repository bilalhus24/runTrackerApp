import React, { useState } from "react";
import axios from "axios";

const adminApis = [
  { name: "Add User", endpoint: "/api/users/add", method: "POST", inputs: ["name", "email", "password", "role"] },
  { name: "Update User", endpoint: "/api/users/{id}/update", method: "PUT", inputs: ["id", "name", "email", "password", "role"] },
  { name: "Delete User", endpoint: "/api/users/{id}/delete", method: "DELETE", inputs: ["id"] },
  { name: "Add Run", endpoint: "/api/runs/add", method: "POST", inputs: ["userId", "miles", "location", "start", "end", "date"] },
  { name: "Update Run", endpoint: "/api/runs/{id}/update", method: "PUT", inputs: ["id", "miles", "location", "start", "end", "date"] },
  { name: "Delete Run", endpoint: "/api/runs/{id}/delete", method: "DELETE", inputs: ["id"] },
  { name: "Get User by ID", endpoint: "/api/users/{id}", method: "GET", inputs: ["id"] },
  { name: "Get All Users", endpoint: "/api/users", method: "GET", inputs: [] },
  { name: "Get Run by ID", endpoint: "/api/runs/{id}", method: "GET", inputs: ["id"] },
  { name: "Get All Runs", endpoint: "/api/runs", method: "GET", inputs: [] },
  { name: "Get Profile", endpoint: "/api/users/profile", method: "GET", inputs: [] },
  { name: "Get Runs for User", endpoint: "/api/runs/user/{id}", method: "GET", inputs: ["id"] },
];

function AdminDashboard() {
  const [selectedApi, setSelectedApi] = useState(null);
  const [formData, setFormData] = useState({});
  const [responseMessage, setResponseMessage] = useState(null); // Change to null for consistent behavior

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApiSelection = (api) => {
    setSelectedApi(api);
    setFormData({});
    setResponseMessage(null); // Clear the previous response
  };

  const handleApiCall = async () => {
    if (!selectedApi) return;

    const formattedFormData = { ...formData };

    // Convert time inputs to "HH:mm:ss" format
    if (formattedFormData.start) {
      const start = new Date(`1970-01-01T${formattedFormData.start}`);
      formattedFormData.start = start.toTimeString().split(" ")[0];
    }
    if (formattedFormData.end) {
      const end = new Date(`1970-01-01T${formattedFormData.end}`);
      formattedFormData.end = end.toTimeString().split(" ")[0];
    }

    // Replace placeholders in the endpoint
    const url = selectedApi.endpoint.replace(/\{(\w+)\}/g, (_, key) => formattedFormData[key] || `{${key}}`);

    // Remove `id` from the payload for POST/PUT requests where `id` is only in the URL
    if (selectedApi.method === "POST" || selectedApi.method === "PUT") {
      delete formattedFormData.id;
    }

    try {
      const response = await axios({
        method: selectedApi.method,
        url: `${process.env.REACT_APP_API_URL}${url}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: selectedApi.method !== "GET" ? formattedFormData : undefined,
      });
      setResponseMessage(response.data); // Save response data directly
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <ul>
        {adminApis.map((api) => (
          <li key={api.name} style={{ marginBottom: '10px' }}>
            <button onClick={() => handleApiSelection(api)}>{api.name}</button>
          </li>
        ))}
      </ul>
      {selectedApi && (
        <div>
          <h3>{selectedApi.name}</h3>
          {selectedApi.inputs.map((input) => (
            <div key={input}>
              <label>{input.charAt(0).toUpperCase() + input.slice(1)}:</label>
              {input === "role" ? (
                <select name={input} value={formData[input] || ""} onChange={handleInputChange} required>
                  <option value="">Select Role</option>
                  <option value="ROLE_GUEST">ROLE_GUEST</option>
                  <option value="ROLE_USER">ROLE_USER</option>
                  <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                </select>
              ) : input === "location" ? (
                <select name={input} value={formData[input] || ""} onChange={handleInputChange} required>
                  <option value="">Select Location</option>
                  <option value="INDOOR">INDOOR</option>
                  <option value="OUTDOOR">OUTDOOR</option>
                </select>
              ) : input === "date" ? (
                <input
                  type="date"
                  name={input}
                  value={formData[input] || ""}
                  onChange={handleInputChange}
                  required
                />
              ) : input === "start" || input === "end" ? (
                <input
                  type="time"
                  name={input}
                  value={formData[input] || ""}
                  onChange={handleInputChange}
                  required
                />
              ) : input === "miles" || input === "userId" || input === "id" ? (
                <input
                  type="number"
                  name={input}
                  value={formData[input] || ""}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <input
                  type="text"
                  name={input}
                  value={formData[input] || ""}
                  onChange={handleInputChange}
                  required
                />
              )}
            </div>
          ))}
          <button onClick={handleApiCall}>Submit</button>
        </div>
      )}
      <div>
        {responseMessage ? (
          typeof responseMessage === "object" ? (
            <pre>{JSON.stringify(responseMessage, null, 2)}</pre>
          ) : (
            <p>{responseMessage}</p>
          )
        ) : null}
      </div>
    </div>
  );
}

export default AdminDashboard;
