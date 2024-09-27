import { FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_SUCCESS, CREATE_PRODUCTS_REQUEST, CREATE_PRODUCTS_SUCCESS, CREATE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAILURE } from "./ActionType";
import { api1, api, API_BASE_URL } from "../../config/apiConfig"
import axios from "axios";


export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST });
    const { category, colors, gender, sizes, minPrice, maxPrice, minDiscount, sort, pageNumber, pageSize } = reqData;
    try {
        const { data } = await axios.get(`${API_BASE_URL}/all/product/getAll`, {
            params: {
                category,
                colors,
                gender,
                sizes,
                minPrice,
                maxPrice,
                minDiscount,
                sort,
                pageNumber,
                pageSize
            }
        });
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
};


export const getProductByCategory = () => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST })
    try {
        const { data } = await axios.get(`${API_BASE_URL}/all/product/getAll`)
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message })
    }
}



export const findProductsById = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })
    const { productId } = reqData;
    try {
        const { data } = await axios.get(`${API_BASE_URL}/all/product/id/${productId}`)
        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCTS_REQUEST });

        const { data } = await api.post(`${API_BASE_URL}/staff/product/add`, product, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log("created product  ", data);

        dispatch({
            type: CREATE_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error('Error creating product:', error.response ? error.response.data : error.message);
        dispatch({ type: CREATE_PRODUCTS_FAILURE, payload: error.message });
    }
}


export const deleteProduct = (productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCTS_REQUEST })
        const { data } = await api.put(`${API_BASE_URL}/staff/product/${productId}/delete`)
        console.log("delete product", data)
        dispatch({
            type: DELETE_PRODUCTS_SUCCESS,
            payload: productId,
        })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCTS_FAILURE, payload: error.message })

    }
}


export const updateProduct = (productId, reqData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST })
        const { data } = await api.put(`${API_BASE_URL}/staff/product/update/${productId}`, reqData)
        console.log("update product", data)
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: productId,
        })
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message })

    }
}

