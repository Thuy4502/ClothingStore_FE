import { api } from "../../../config/apiConfig";
import { GET_CUSTOMERS_FAILURE, GET_CUSTOMERS_REQUEST, GET_CUSTOMERS_SUCCESS } from "./ActionType";

export const getCustomers = () => async (dispatch) => {
    dispatch({ type: GET_CUSTOMERS_REQUEST });
    try {
        const response = await api.get(`staff/customer/getAll`);
        const data = response.data;
        console.log("customerssssss ", data)
        dispatch({ type: GET_CUSTOMERS_SUCCESS, customer:data.payload, payload: data });
    } catch (error) {
        console.log("catch error", error);
        dispatch({ type: GET_CUSTOMERS_FAILURE, payload: error.message });
    }
};