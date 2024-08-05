import { 
    CREATE_REVIEW_FAILURE, 
    CREATE_REVIEW_REQUEST, 
    CREATE_REVIEW_SUCCESS, 
    GET_PRODUCT_REVIEW_FAILURE, 
    GET_PRODUCT_REVIEW_REQUEST, 
    GET_PRODUCT_REVIEW_SUCCESS 
} from "./ActionType";

const initialState = {
    productReviews: [], // Lưu trữ đánh giá sản phẩm
    loading: false,
    error: null
}

export const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCT_REVIEW_REQUEST:
        case CREATE_REVIEW_REQUEST:
            return { ...state, loading: true, error: null }
        case GET_PRODUCT_REVIEW_SUCCESS:
            return { ...state, loading: false, error: null, productReviews: action.payload }
        case CREATE_REVIEW_SUCCESS:
            return {...state, 
                loading: false, 
                error: null,
                productReviews: [...state.productReviews, action.payload] } // Có thể thêm logic để cập nhật danh sách đánh giá nếu cần
        case GET_PRODUCT_REVIEW_FAILURE:
        case CREATE_REVIEW_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}
