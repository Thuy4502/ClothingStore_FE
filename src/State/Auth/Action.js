import axios from 'axios'; // Đảm bảo đã import axios
import { API_BASE_URL } from "../../config/apiConfig";
import { 
    LOGOUT, 
    REGISTER_REQUEST, 
    REGISTER_FAILURE, 
    REGISTER_SUCCESS, 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE, 
    GET_USER_FAILURE, 
    GET_USER_SUCCESS, 
    GET_USER_REQUEST 
} from "./ActionType";

// Actions for register
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });
const staffId = 0;

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData); // Sửa từ reponse thành response
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch(registerSuccess(user.jwt));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

// Actions for login
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData); // Sửa đường dẫn API nếu cần
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        localStorage.setItem("staffId", user.staff.staffId);
        console.log("ng dung--------------------", user.staff.staffId);
        dispatch(loginSuccess(user.jwt)); // Sửa từ userjwt thành user.jwt
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

// Actions for getUser
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
            headers: {
                "Authorization": `Bearer ${jwt}`
            }
        });
        const user = response.data;
        localStorage.setItem("staffId", user.staff.staffId);
        console.log("ng dung--------------------", user.staff.staffId);
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
};

// Actions for logout
export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
    localStorage.clear();
};
