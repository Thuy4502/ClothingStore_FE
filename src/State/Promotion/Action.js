import { api, API_BASE_URL  } from "../../config/apiConfig";
import axios from "axios";



import {
    CREATE_PROMOTION_REQUEST,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILURE,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILURE,
    GET_PROMOTIONS_REQUEST,
    GET_PROMOTIONS_SUCCESS,
    GET_PROMOTIONS_FAILURE,
    GET_ACTIVE_PROMOTION_REQUEST,
    GET_ACTIVE_PROMOTION_SUCCESS,
    GET_ACTIVE_PROMOTION_FAILURE,
    ADD_PROMOTION_ITEM_REQUEST,
    ADD_PROMOTION_ITEM_SUCCESS
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

export const getActivePromotions = () => async (dispatch) => {
    try {
        dispatch({ type: GET_ACTIVE_PROMOTION_REQUEST });
        const response = await axios.get(`${API_BASE_URL}/all/promtion/active`);
        const data = response.data;
        localStorage.setItem("discountValue", data?.data[0].discountValue)
        dispatch({
            type: GET_ACTIVE_PROMOTION_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Error fetching active promotions: ", error);
        dispatch({
            type: GET_ACTIVE_PROMOTION_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
    }
};

export const addPromotionItem = (req) => async (dispatch) => {
    try {
        dispatch({ type: ADD_PROMOTION_ITEM_REQUEST });
        const response = await api.post(`${API_BASE_URL}/staff/promotion/add/detail`, req);
        const data = response.data;
        console.log("Thêm sản phẩm vào chương trình khuyến mãi: ", data)
       
        dispatch({
            type: ADD_PROMOTION_ITEM_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error("Error add new promotions item: ", error);
        dispatch({
            type: ADD_PROMOTION_ITEM_SUCCESS,
            payload: error.response ? error.response.data : error.message,
        });
    }
};