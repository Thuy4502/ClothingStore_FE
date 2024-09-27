import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAILURE,
    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,
} from "./ActionType";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE_REQUEST:
            return { ...state, isLoading: true, error: null };
        case EDIT_PROFILE_SUCCESS:
            return { ...state, isLoading: false, error: null, user: action.payload };
        case EDIT_PROFILE_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        case CHANGE_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: null };
        case CHANGE_PASSWORD_SUCCESS:
            return { ...state, isLoading: false, error: null };
        case CHANGE_PASSWORD_FAILURE:
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state;
    }
};
