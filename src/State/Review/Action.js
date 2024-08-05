import { api1, api } from "../../config/apiConfig"
import { CREATE_REVIEW_FAILURE, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, GET_PRODUCT_REVIEW_FAILURE, GET_PRODUCT_REVIEW_REQUEST, GET_PRODUCT_REVIEW_SUCCESS } from "./ActionType"


export const getProductReview=(productId)=>async(dispatch)=> {
    dispatch({type:GET_PRODUCT_REVIEW_REQUEST})
    
    try {
        const {data}= await api.get(`customer/review/product/${productId}`)
        console.log("Danh sach danh gia: ", data)
        dispatch({type: GET_PRODUCT_REVIEW_SUCCESS, payload:data})
    }
    catch(error) {
        dispatch({type:GET_PRODUCT_REVIEW_FAILURE, payload:error.message})
    }
}

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