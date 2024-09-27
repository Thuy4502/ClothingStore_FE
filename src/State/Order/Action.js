import { BUY_NOW_FAILURE, BUY_NOW_REQUEST, BUY_NOW_SUCCESS, CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_BY_ID_FAILURE, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, GET_ORDER_HISTORY_FAILURE, GET_ORDER_HISTORY_REQUEST, GET_ORDER_HISTORY_SUCCESS } from "./ActionType"
import { api } from "../../config/apiConfig";


export const createOrder=(reqData)=> async (dispatch)=>{
    dispatch({type:CREATE_ORDER_REQUEST})

    try {
        const {data}= await api.post(`/customer/order/create`,
            reqData.address,
            
        );
        console.log("Thong tin don hang: ", data)
       if(data.orderId) {
        reqData.navigate({search: `stept=3&order_id=${data.orderId}`});
       }
       dispatch({
        type: CREATE_ORDER_SUCCESS,
        payload: data,
       });
    } catch(error) {
        dispatch({type:CREATE_ORDER_FAILURE, payload:error.message});
    }
}

export const orderBuyNow = (reqData) => async (dispatch) => {
    dispatch({ type: BUY_NOW_REQUEST });

    try {
        const { data } = await api.post('customer/order/buyNow', reqData);

        console.log("Thông tin đơn hàng buy now: ", data);

        dispatch({
            type: BUY_NOW_SUCCESS,
            payload: data,
        });

        // Optional: Redirect or navigate if needed
        // if (data.orderId) {
        //     navigate({ search: `?step=3&order_id=${data.orderId}` });
        // }

    } catch (error) {
        // Log detailed error information for debugging
        console.error("Error during buy now:", error.response?.data || error.message);

        dispatch({
            type: BUY_NOW_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const getOrderById=(orderId)=> async(dispatch)=>{
    dispatch({type:GET_ORDER_BY_ID_REQUEST})

    try {
        const {data}=await api.get(`/customer/order/findById/${orderId}`, )
        // if(orderId) {
        //     reqData.navigate({search: `/account/order/&order_id=${orderId}`});
        // }
        console.log("Chi tiet don hang", data)
        // if(data.orderId) {
        //     reqData.navigate({search: `&order_id=${data.orderId}`});
        //    }
        dispatch({type:GET_ORDER_BY_ID_SUCCESS, payload:data});
    } catch(error) {
        dispatch({type:GET_ORDER_BY_ID_FAILURE, payload:error.message})
    }
}

export const getOrderHistory=() => async(dispatch) => {
    dispatch({type:GET_ORDER_HISTORY_REQUEST})
    try {
        const {data}=await api.get(`/customer/order/userOrderHistory`)
        console.log("Lịch sử đặt hàng", data)
        dispatch({type:GET_ORDER_HISTORY_SUCCESS, payload:data});
    } catch(error) {
        dispatch({type:GET_ORDER_HISTORY_FAILURE, payload:error.message})
    }
}

export const cancelOrder=(orderId) => async(dispatch) => {
    dispatch({type:CANCEL_ORDER_REQUEST})
    try {
        const {data}=await api.put(`/all/order/${orderId}/cancel`)
        console.log("Hủy đặt hàng", data)
        dispatch({type:CANCEL_ORDER_SUCCESS, payload:data});
    } catch(error) {
        dispatch({type:CANCEL_ORDER_FAILURE, payload:error.message})
    }
}




