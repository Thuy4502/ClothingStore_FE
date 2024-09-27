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
    GET_USER_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from "./ActionType";
import { getCart } from '../Cart/Action';

// Actions for register
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
        const user = response.data;
        if (user.jwt) {
            localStorage.setItem("jwt", user.jwt);
        }
        dispatch(registerSuccess(user.jwt));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};

const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
    localStorage.clear();
    dispatch(loginRequest());
  
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
        const user = response.data;
        console.log("Thông tin đăng nhập ", user);
        if (user.jwt) {
          localStorage.setItem("jwt", user.jwt);
        }
        dispatch(loginSuccess(user.jwt));
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        console.error("Error response:", error.response.data.message);
        dispatch(loginFailure(errorMessage));
      }
  };

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
    localStorage.clear();  // Clear local storage
    window.location.reload();  // Reload the page
};


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
        if (user.data.user.roleId === 2) {
            localStorage.setItem("role", user.data.user.roleId);
            localStorage.setItem("staffId", user.data.staffId);
        } else {
            localStorage.setItem("point", user.data.user.point);
            dispatch(getCart());
        }
        
        dispatch(getUserSuccess(user));
    } catch (error) {
        console.error("Error fetching user profile:", error.response ? error.response.data : error.message);
        dispatch(getUserFailure(error.response ? error.response.data.message : error.message));
    }
};


export const forgotPassword = (email) => async (dispatch) => {
    dispatch({type: FORGOT_PASSWORD_REQUEST})
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/forgot-password`, {email})
        console.log("Forgot password", data)
        dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: data})
        
    }
    catch(error) {
        dispatch({type: FORGOT_PASSWORD_FAILURE, payload: error.message})
    }
    
}


// export const logout = () => (dispatch) => {
//     dispatch({ type: LOGOUT, payload: null });
//     localStorage.clear();
//     // localStorage.removeItem('jwt');
//     // localStorage.removeItem('role');
//     // window.location.reload(true);
// };
