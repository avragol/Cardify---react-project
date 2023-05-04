import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import ROUTES from "./ROUTES";

const LoggedProtectedRoute = ({ element }) => {

  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);

  if (isLoggedIn) {
    return element;
  } else {
    return <Navigate to={ROUTES.LOGIN} />;
  }
};
export default LoggedProtectedRoute;
