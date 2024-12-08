// import React from "react";
// import { Link } from "react-router-dom";

// function Navbar() {
//   const role = localStorage.getItem("role");

//   return (
//     <nav
//       className = "navbar"
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "1rem",
//         backgroundColor: "#f0f0f0",
//         borderBottom: "1px solid #ccc",
//       }}
//     >
//       <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
//         Run Tracker App
//       </h1>
//       <ul
//         style={{
//           display: "flex",
//           listStyle: "none",
//           margin: 0,
//           padding: 0,
//           alignItems: "center",
//         }}
//       >
//         <li style={{ margin: "0 1rem" }}>
//           <Link to="/" style={linkStyle}>
//             Home
//           </Link>
//         </li>
//         <li style={{ margin: "0 1rem" }}>
//           <Link to="/login" style={linkStyle}>
//             Login
//           </Link>
//         </li>
//         <li style={{ margin: "0 1rem" }}>
//           <Link to="/register" style={linkStyle}>
//             Register
//           </Link>
//         </li>
//         <li style={{ margin: "0 1rem" }}>
//           <Link
//             to={
//               role === "ROLE_ADMIN"
//                 ? "/Admin"
//                 : role === "ROLE_USER"
//                 ? "/User"
//                 : "/Guest"
//             }
//             style={linkStyle}
//           >
//             Dashboard
//           </Link>
//         </li>
//         <li style={{ margin: "0 1rem" }}>
//           <Link to="/tables" style={linkStyle}>
//             Tables
//           </Link>
//         </li>
//         <li style={{ margin: "0 1rem" }}>
//           <Link
//             to="/login"
//             style={linkStyle}
//             onClick={() => {
//               localStorage.removeItem("token");
//               localStorage.removeItem("role");
//             }}
//           >
//             Logout
//           </Link>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// const linkStyle = {
//   textDecoration: "none",
//   color: "#333",
//   padding: "0.5rem 1rem",
//   border: "1px solid #ccc",
//   borderRadius: "4px",
//   backgroundColor: "#fff",
//   cursor: "pointer",
//   transition: "background-color 0.3s",
//   fontSize: "1rem",
//   display: "inline-block",
// };

// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const handleDashboardRedirect = () => {
    switch (role) {
      case "ROLE_ADMIN":
        navigate("/Admin");
        break;
      case "ROLE_USER":
        navigate("/User");
        break;
      case "ROLE_GUEST":
        navigate("/Guest");
        break;
      default:
        navigate("/login"); // Fallback if role is not found
    }
  };

  return (
    <nav
      className="navbar"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f0f0f0",
        borderBottom: "1px solid #ccc",
      }}
    >
      <h1 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
        Run Tracker App
      </h1>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
      >
        <li style={{ margin: "0 1rem" }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <Link to="/register" style={linkStyle}>
            Register
          </Link>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <button
            onClick={handleDashboardRedirect}
            style={{ ...linkStyle}}
          >
            Dashboard
          </button>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <Link to="/tables" style={linkStyle}>
            Tables
          </Link>
        </li>
        <li style={{ margin: "0 1rem" }}>
          <Link
            to="/login"
            style={linkStyle}
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("role");
            }}
          >
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#333",
  padding: "0.5rem 1rem",
  border: "1px solid #ccc",
  borderRadius: "4px",
  backgroundColor: "#fff",
  cursor: "pointer",
  transition: "background-color 0.3s",
  fontSize: "1rem",
  display: "inline-block",
};

export default Navbar;
