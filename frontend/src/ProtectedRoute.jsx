// import React from "react";


// function ProtectedRoute({ children, roleRequired }) {
//   const userRole = localStorage.getItem("role");

//   const roleHierarchy = {
//     ROLE_GUEST: 1,
//     ROLE_USER: 2,
//     ROLE_ADMIN: 3,
//   };

//   if (roleHierarchy[userRole] >= roleHierarchy[roleRequired]) {
//     return children;
//   } else {
//     return <div>
//               Unauthorized Access. You do not have permission to view this page.
//             </div>;
//   }
// }

// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roleRequired }) {
  const userRole = localStorage.getItem("role");

  const roleHierarchy = {
    ROLE_GUEST: 1,
    ROLE_USER: 2,
    ROLE_ADMIN: 3,
  };

  if (userRole && roleHierarchy[userRole] >= roleHierarchy[roleRequired]) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
}

export default ProtectedRoute;
