import { api } from "../../../config/apiConfig";
import {
    CANCELED_ORDER_REQUEST,
    CANCELED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS,
    CANCELED_ORDER_FAILURE,
} from "./ActionType";

// Get Orders
export const getOrders = () => async (dispatch) => {
    dispatch({ type: GET_ORDERS_REQUEST });
    try {
        const response = await api.get(`/order/getAll`);
        console.log("get all orders", response);
        dispatch({ type: GET_ORDERS_SUCCESS, payload: response.data });
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: GET_ORDERS_FAILURE, payload: error.message });
    }
};

// Confirm Order
export const confirmOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CONFIRMED_ORDER_REQUEST });
    try {
        const response = await api.put(`/order/${orderId}/confirm`);
        const data = response.data;
        console.log("confirm orders", data);
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data });
        dispatch(getOrders());
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message });
    }
};

// Ship Order
export const shipOrder = (orderId) => async (dispatch) => {
    dispatch({ type: SHIP_ORDER_REQUEST });
    try {
        const response = await api.put(`/order/${orderId}/ship`);
        const data = response.data;
        console.log("ship orders", data);
        dispatch({ type: SHIP_ORDER_SUCCESS, payload: data });
        dispatch(getOrders());
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message }); // Should be SHIP_ORDER_FAILURE
    }
};

// Delivered Order
export const deliveredOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST }); // Should be DELIVERED_ORDER_REQUEST
    try {
        const response = await api.put(`/order/${orderId}/deliver`);
        const data = response.data;
        console.log("deliver orders", data);
        dispatch({ type: CONFIRMED_ORDER_SUCCESS, payload: data }); // Should be DELIVERED_ORDER_SUCCESS
        dispatch(getOrders());
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: CONFIRMED_ORDER_FAILURE, payload: error.message }); // Should be DELIVERED_ORDER_FAILURE
    }
};

// Cancel Order
export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCELED_ORDER_REQUEST });
    try {
        const response = await api.put(`/order/${orderId}/cancel`);
        const data = response.data;
        console.log("cancel orders", data);
        dispatch({ type: CANCELED_ORDER_SUCCESS, payload: data });
        dispatch(getOrders());
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: CANCELED_ORDER_FAILURE, payload: error.message }); // Added dispatch for failure case
    }
};

// Delete Order
export const deleteOrder = (orderId) => async (dispatch) => {
    dispatch({ type: DELETE_ORDER_REQUEST });
    try {
        const response = await api.delete(`/order/${orderId}/delete`); // Use DELETE method for deleting
        const data = response.data;
        console.log("delete orders", data);
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
        dispatch(getOrders());
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: DELETE_ORDER_FAILURE, payload: error.message });
    }
};
