import axios from "axios"
import { api1, api } from "../../config/apiConfig"
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_PRODUCT_REVIEW_FAILURE, GET_PRODUCT_REVIEW_REQUEST, GET_PRODUCT_REVIEW_SUCCESS } from "./ActionType"
import { API_BASE_URL } from "../../config/apiConfig";

export const getProductReview = (productId) => async (dispatch) => {
    dispatch({ type: GET_PRODUCT_REVIEW_REQUEST });

    try {
        const response = await axios.get(`http://localhost:5454/all/product/${productId}`);
        const data = response.data; 
        dispatch({ type: GET_PRODUCT_REVIEW_SUCCESS, payload: data });
    } catch (error) {
        console.error("API Error: ", error.response ? error.response.data : error.message);
        dispatch({ type: GET_PRODUCT_REVIEW_FAILURE, payload: error.message });
    }
};



export const createReview = (reqData) => async (dispatch) => {
    dispatch({type:CREATE_REVIEW_REQUEST})
    
    try {
        const {data}= await api.post(`customer/review/create`, reqData)
        dispatch({type: CREATE_REVIEW_SUCCESS, payload:data})
    }
    catch(error) {
        dispatch({type:CREATE_REVIEW_FAILURE, payload:error.message})
    }
}