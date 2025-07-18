import { Navigate } from "react-router-dom";

export default function ProtectedRoutes(props) {
  if (localStorage.getItem("u-token")) {
    return props.children;
  } else {
    return <Navigate to={"/login"} />;
  }
}
