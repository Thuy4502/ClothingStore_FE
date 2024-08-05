import { 
    CREATE_PROMOTION_REQUEST,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILURE,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILURE,
    GET_PROMOTIONS_REQUEST,
    GET_PROMOTIONS_SUCCESS,
    GET_PROMOTIONS_FAILURE
} from "./ActionType";

const initialState = {
    promotions: [],  // Thêm trường để lưu trữ danh sách khuyến mãi
    promotion: null, // Thêm trường để lưu trữ khuyến mãi cụ thể
    loading: false,
    error: null
};

export const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROMOTION_REQUEST:
        case UPDATE_PROMOTION_REQUEST:
        case GET_PROMOTIONS_REQUEST:
            return { ...state, loading: true, error: null };
            
        case CREATE_PROMOTION_SUCCESS:
            return { ...state, loading: false, error: null, promotion: action.payload };
            
        case UPDATE_PROMOTION_SUCCESS:
            return { ...state, loading: false, error: null, promotion: action.payload };
            
        case GET_PROMOTIONS_SUCCESS:
            return { ...state, loading: false, error: null, promotions: action.payload }; // Fix here
            
        case CREATE_PROMOTION_FAILURE:
        case UPDATE_PROMOTION_FAILURE:
        case GET_PROMOTIONS_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        default:
            return state;
    }
};
