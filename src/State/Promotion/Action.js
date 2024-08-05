import { api } from "../../config/apiConfig";

import {
    CREATE_PROMOTION_REQUEST,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILURE,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILURE,
    GET_PROMOTIONS_REQUEST,
    GET_PROMOTIONS_SUCCESS,
    GET_PROMOTIONS_FAILURE
} from "./ActionType";


export const createPromotion = (reqData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PROMOTION_REQUEST })
        const { data } = await api.post(`staff/promotion/add`, reqData, {
            headers: { 'Content-Type': 'application/json' }
        })

        console.log("Create promotion ", data);
        dispatch({
            type: CREATE_PROMOTION_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        console.error("Error creating promotion: ", error.response ? error.response.data : error.message)
        dispatch({ type: CREATE_PROMOTION_FAILURE, payload: error.message });
    }
    
}

export const getAllPromotion = () => async (dispatch) => {
    try {
        dispatch({ type: GET_PROMOTIONS_REQUEST })
        const { data } = await api.get(`staff/promotion/getAll`, {
            headers: { 'Content-Type': 'application/json' }
        })

        console.log("Get all promotion ", data);
        dispatch({
            type: GET_PROMOTIONS_SUCCESS,
            payload: data,
        })
    }
    catch (error) {
        console.error("Error get all promotion: ", error.response ? error.response.data : error.message)
        dispatch({ type: GET_PROMOTIONS_FAILURE, payload: error.message });
    }
    
}