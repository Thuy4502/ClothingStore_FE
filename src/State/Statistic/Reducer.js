import { 
    RETRIVE_TOP_SELLING_REQUEST, 
    RETRIVE_TOP_SELLING_SUCCESS, 
    RETRIVE_TOP_SELLING_FAILURE, 
    RETRIVE_MONTHLY_REVENUE_REQUEST, 
    RETRIVE_MONTHLY_REVENUE_SUCCESS, 
    RETRIVE_MONTHLY_REVENUE_FAILURE 
} from "./ActionType";

const initialState = {
    topSellingProducts: [], // Lưu trữ sản phẩm bán chạy
    monthlyRevenue: [], // Lưu trữ doanh thu theo tháng
    loading: false,
    error: null
}

export const statisticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case RETRIVE_TOP_SELLING_REQUEST:
        case RETRIVE_MONTHLY_REVENUE_REQUEST:
            return { ...state, loading: true, error: null }
        case RETRIVE_TOP_SELLING_SUCCESS:
            return { ...state, loading: false, error: null, topSellingProducts: action.payload }
        case RETRIVE_MONTHLY_REVENUE_SUCCESS:
            return { ...state, loading: false, error: null, monthlyRevenue: action.payload }
        case RETRIVE_TOP_SELLING_FAILURE:
        case RETRIVE_MONTHLY_REVENUE_FAILURE:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
}
