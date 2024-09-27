import { 
    GET_USER_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILURE
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
    forgotPasswordLoading: false,
    forgotPasswordError: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null, forgotPasswordLoading: action.type === FORGOT_PASSWORD_REQUEST ? true : state.forgotPasswordLoading };
        
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoading: false, error: null, jwt: action.payload, forgotPasswordLoading: false };
        
        case GET_USER_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload, forgotPasswordLoading: false };
        
        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload, forgotPasswordLoading: false };
        
        case FORGOT_PASSWORD_SUCCESS:
            return { ...state, forgotPasswordLoading: false, forgotPasswordError: null };
        
        case FORGOT_PASSWORD_FAILURE:
            return { ...state, forgotPasswordLoading: false, forgotPasswordError: action.payload };
        
        case LOGOUT:
            return { ...initialState };
        
        default:
            return state;
    }
}
