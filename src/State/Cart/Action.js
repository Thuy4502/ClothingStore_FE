import { REGISTER_SUCCESS } from "../Auth/ActionType"
import { ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, GET_CART_FAILURE, GET_CART_REQUEST, GET_CART_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType"
import { api } from "../../config/apiConfig"


export const getCart=()=> async (dispatch)=>{
    dispatch({type:GET_CART_REQUEST})

    try {
        const {data}= await api.get(`/customer/cart/getCart`)
        dispatch({type:GET_CART_SUCCESS, payload:data})
        console.log("cart ", data)
    } catch(error) {
        dispatch({type:GET_CART_FAILURE, payload:error.message})
    }
}

export const addItemToCart=(req)=> async(dispatch)=>{
    dispatch({type:ADD_ITEM_TO_CART_REQUEST})

    try {
        const {data}=await api.post(`/customer/cart/addItem`, req)
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS, payload:data})
        console.log("addItemToCart :", data)

    } catch(error) {
        dispatch({type:ADD_ITEM_TO_CART_SUCCESS, payload:error.message})
    }
}

export const removeCartItem=(cartItemId)=> async (dispatch)=>{
    dispatch({type:REMOVE_CART_ITEM_REQUEST})

    try {
        const {data}= await api.delete(`/customer/cart/removeCartItem/${cartItemId}`)
        dispatch({type:REMOVE_CART_ITEM_SUCCESS, payload:cartItemId})
    } catch(error) {
        dispatch({type:REMOVE_CART_ITEM_FAILURE, payload:error.message})
    }
}

export const updateCartItem=(reqData)=> async (dispatch)=>{
    dispatch({type:UPDATE_CART_ITEM_REQUEST})

    try {
        const {data}=await api.put(`/customer/cart/updateCartItem/${reqData.cartItemId}`, reqData.data)
        console.log("Cap nhat san pham ", data)
        dispatch({type:UPDATE_CART_ITEM_SUCCESS, payload:data})
    } catch(error) {
        dispatch({type:UPDATE_CART_ITEM_FAILURE, payload:error.message})
    }
}


