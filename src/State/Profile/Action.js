import { CHANGE_PASSWORD_FAILURE, CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, EDIT_PROFILE_FAILURE, EDIT_PROFILE_REQUEST, EDIT_PROFILE_SUCCESS } from "./ActionType"
import { api } from "../../config/apiConfig"

export const editProfile = (reqData) => async (dispatch) => {
    dispatch({ type: EDIT_PROFILE_REQUEST })
    try {
        const { data } = await api.put(`user/profile/update`, reqData)
        console.log("user:  ", data)
        dispatch({ type: EDIT_PROFILE_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: EDIT_PROFILE_FAILURE, payload: error.message })
    }
}

export const changePassword = (reqData) => async (dispatch) => {
    dispatch({type: CHANGE_PASSWORD_REQUEST})
    try {
        const {data} = await api.put(`user/change/password`, reqData)
        console.log("Change password: ", data)
        dispatch({type: CHANGE_PASSWORD_SUCCESS, payload: data})
    }
    catch(error) {
        dispatch({type: EDIT_PROFILE_FAILURE, payload: error.message})
    }
}
