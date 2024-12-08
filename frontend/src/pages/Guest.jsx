// import React from "react";
// import axios from "axios";

// const guestApis = [
//   { name: "Get Profile", endpoint: "/api/users/profile", method: "GET" },
//   { name: "Get Runs for User", endpoint: "/api/runs/user/{id}", method: "GET" },
// ];

// function GuestDashboard() {
//   const handleApiCall = async (api) => {
//     try {
//       const endpoint = api.endpoint.replace("{id}", "1"); // Replace with actual ID
//       const response = await axios({
//         method: api.method.toLowerCase(),
//         url: `${process.env.REACT_APP_API_URL}${endpoint}`,
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       console.log("API Response:", response.data);
//     } catch (error) {
//       console.error("API Error:", error.response?.data || "Error occurred");
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Guest Dashboard</h2>
//       <ul>
//         {guestApis.map((api) => (
//           <li key={api.name} style={{ marginBottom: '10px' }}>
//             {api.name} - {api.method} - {api.endpoint}
//             <button onClick={() => handleApiCall(api)}>Call</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default GuestDashboard;
import React, { useState } from "react";
import axios from "axios";

const guestApis = [
  { name: "Get Profile", endpoint: "/api/users/profile", method: "GET", inputs: [] },
  { name: "Get Runs for User", endpoint: "/api/runs/user/{id}", method: "GET", inputs: ["id"] },
];

function GuestDashboard() {
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

    // Replace placeholders in the endpoint
    const url = selectedApi.endpoint.replace(/\{(\w+)\}/g, (_, key) => formattedFormData[key] || `{${key}}`);

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
      <h2>Guest Dashboard</h2>
      <ul>
        {guestApis.map((api) => (
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
              {input === "id" ? (
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

export default GuestDashboard;