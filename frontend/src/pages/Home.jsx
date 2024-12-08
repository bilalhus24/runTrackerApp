import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <div 
        className="container"
        style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}
      >
        <h1>Welcome to the Run Tracker Application</h1>
        <p>
          This application helps manage users and track their running activities. It is powered by a{" "}
          <strong>PostgreSQL database</strong>, hosted on Supabase and uses <strong>JWT (JSON Web Tokens)</strong> for secure authentication
          and role-based access control.
        </p>
        <div className="alert alert-success">
          Have an account? <Link to="/login">Login</Link>
        </div>
        <div className="alert alert-error">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
        <h2>Key Features</h2>
        <ul>
          <li>
            <strong>User Authentication:</strong>
            <ul>
              <li>
                <strong>Register:</strong> Users register with their name, email, password, and role. A verification email
                is sent, and the account becomes active after verification.
              </li>
              <li>
                <strong>Login:</strong> Users log in with their email and password. A <strong>JWT token</strong> is issued
                upon successful login.
              </li>
            </ul>
          </li>
          <li>
            <strong>Role-Based Access Control:</strong>
            <ul>
              <li>
                <strong>Guest (ROLE_GUEST):</strong> Can view their profile and see runs for specific users.
              </li>
              <li>
                <strong>User (ROLE_USER):</strong> Can perform guest actions and fetch data about users and runs.
              </li>
              <li>
                <strong>Admin (ROLE_ADMIN):</strong> Can perform all actions, including creating, updating, and deleting
                users and runs.
              </li>
            </ul>
          </li>
          <li>
            <strong>APIs and Database Interaction:</strong> The application uses APIs to manage users and runs, and
            stores all data in a <strong>PostgreSQL database</strong>.
          </li>
          <li>
            <strong>Tables:</strong> Users can view:
            <ul>
              <li>
                <strong>Users Table:</strong> Displays details like name, email, role, total runs, and total distance.
              </li>
              <li>
                <strong>Runs Table:</strong> Shows run details such as user ID, miles, location, start/end time, duration,
                and average pace.
              </li>
            </ul>
          </li>
          <li>
            <strong>Dashboard:</strong> Each role has a dedicated dashboard with specific access:
            <ul>
              <li>
                <strong>Guest Dashboard:</strong> Limited to profile and runs for specific users.
              </li>
              <li>
                <strong>User Dashboard:</strong> Can access guest features and fetch user/run data.
              </li>
              <li>
                <strong>Admin Dashboard:</strong> Full access to manage users and runs.
              </li>
            </ul>
          </li>
        </ul>

        <h2>How It Works</h2>
        <ol>
          <li>
            <strong>Registration and Verification:</strong> Users register with their details and verify their account
            through an email link.
          </li>
          <li>
            <strong>JWT Authentication:</strong> Upon login, a JWT token is issued and stored locally. The token is used
            for authentication in all API requests.
          </li>
          <li>
            <strong>Role-Based API Access:</strong> The backend checks the token and role to grant or deny access to
            specific APIs.
          </li>
          <li>
            <strong>Dynamic Tables:</strong> Clicking "Show Users" or "Show Runs" displays data from the database in a
            structured table format.
          </li>
          <li>
            <strong>Frontend and Backend Communication:</strong> The frontend uses <strong>Axios</strong> to send requests
            and display data dynamically using <strong>React</strong>.
          </li>
        </ol>

        <h2>Summary of Roles</h2>
        <table
          border="1"
          cellPadding="5"
          cellSpacing="0"
          style={{ borderCollapse: "collapse", width: "100%", textAlign: "left" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th>Role</th>
              <th>Permissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Guest (ROLE_GUEST)</strong>
              </td>
              <td>View profile and runs for specific users.</td>
            </tr>
            <tr>
              <td>
                <strong>User (ROLE_USER)</strong>
              </td>
              <td>Perform guest actions, fetch users/runs by ID, and view all users/runs.</td>
            </tr>
            <tr>
              <td>
                <strong>Admin (ROLE_ADMIN)</strong>
              </td>
              <td>Full access to all actions, including adding, updating, and deleting users and runs.</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: "20px" }}>
          This application is designed to be efficient, secure, and easy to use for tracking user and run data. Let’s get
          started!
        </p>
      </div>
    </div>
  );
}

export default Home;
