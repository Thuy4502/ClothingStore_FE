import { FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_SUCCESS, CREATE_PRODUCTS_REQUEST, CREATE_PRODUCTS_SUCCESS, CREATE_PRODUCTS_FAILURE, DELETE_PRODUCTS_REQUEST, DELETE_PRODUCTS_SUCCESS, DELETE_PRODUCTS_FAILURE } from "./ActionType";
import { api1, api, API_BASE_URL } from "../../config/apiConfig"


export const findProducts = (reqData) => async (dispatch) => {
    dispatch({ type: FIND_PRODUCTS_REQUEST })
    const { category, colors, gender, sizes, minPrice, maxPrice, minDiscount, sort, pageNumber, pageSize } = reqData;
    console.log("Param to call api", reqData);
    try {
        const { data } = await api.get(`products/getAll?category=${category}&colors=${colors}&gender=${gender}&sizes=${sizes}&minPrice=${minPrice}&sort=${sort}&pageNumber=${pageNumber}`)
        const str = `products/getAll?category=${category}&colors=${colors}&gender=${gender}&sizes=${sizes}&minPrice=${minPrice}&sort=${sort}&pageNumber=${pageNumber}`

        console.log("Link:  ", str)
        console.log("product data:  ", data)

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
        const { data } = await api.get(`products/id/${productId}`)
        console.log("productId", data)

        dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
    }
    catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}

export const createProduct = (product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCTS_REQUEST });
        
        // Gửi yêu cầu POST với header Content-Type là application/json
        const { data } = await api.post(`/staff/product/add`, product, {
            headers: { 'Content-Type': 'application/json' }
        });

        console.log("created product  ", data);

        dispatch({
            type: CREATE_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // In ra chi tiết lỗi để phân tích
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