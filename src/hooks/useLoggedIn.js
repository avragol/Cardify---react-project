import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import jwt_decode from "jwt-decode";

const useLoggedIn = () => {
    const dispatch = useDispatch();
    return () => {
        const token = localStorage.getItem("userToken")
        if (!token) {
            return;
        }
        const payload = jwt_decode(token);
        dispatch(authActions.login(payload))
    }
}
export default useLoggedIn;