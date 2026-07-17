import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const userString = localStorage.getItem("user");

  console.log("Stored User:", userString);

  if (!userString) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  console.log("Parsed User:", user);

  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminRoute;
