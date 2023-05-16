import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import ROUTES from "../ROUTES";

const PayloadProtectedRoute = ({ element, isAdmin, isBiz }) => {

  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const payload = useSelector((bigState) => bigState.authSlice.payload);

  if (isLoggedIn) {
    if (
      (isAdmin && payload && payload.isAdmin) ||
      (isBiz && payload && payload.biz)
    ) {
      return element;
    }
  }
  toast.error("invalid permissions");
  return <Navigate to={ROUTES.HOME} />;
};
export default PayloadProtectedRoute;
