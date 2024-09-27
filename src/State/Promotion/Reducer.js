import { 
    CREATE_PROMOTION_REQUEST,
    CREATE_PROMOTION_SUCCESS,
    CREATE_PROMOTION_FAILURE,
    UPDATE_PROMOTION_REQUEST,
    UPDATE_PROMOTION_SUCCESS,
    UPDATE_PROMOTION_FAILURE,
    GET_PROMOTIONS_REQUEST,
    GET_PROMOTIONS_SUCCESS,
    GET_PROMOTIONS_FAILURE,
    GET_ACTIVE_PROMOTION_REQUEST,
    GET_ACTIVE_PROMOTION_SUCCESS,
    GET_ACTIVE_PROMOTION_FAILURE,
    ADD_PROMOTION_ITEM_REQUEST,
    ADD_PROMOTION_ITEM_SUCCESS,
    ADD_PROMOTION_ITEM_FAILURE
} from "./ActionType";

const initialState = {
    promotions: [],  
    promotion: null, 
    activePromotions: [], 
    loading: false,
    error: null,
    promotionItems: [], // Add this if you want to store the added promotion items
};

export const promotionReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_PROMOTION_REQUEST:
        case UPDATE_PROMOTION_REQUEST:
        case GET_PROMOTIONS_REQUEST:
        case GET_ACTIVE_PROMOTION_REQUEST:
        case ADD_PROMOTION_ITEM_REQUEST: // Handle request state for adding promotion items
            return { ...state, loading: true, error: null };
            
        case CREATE_PROMOTION_SUCCESS:
            return { ...state, loading: false, error: null, promotion: action.payload };
            
        case UPDATE_PROMOTION_SUCCESS:
            return { ...state, loading: false, error: null, promotion: action.payload };
            
        case GET_PROMOTIONS_SUCCESS:
            return { ...state, loading: false, error: null, promotions: action.payload };
        
        case GET_ACTIVE_PROMOTION_SUCCESS:
            return { ...state, loading: false, error: null, activePromotions: action.payload };
            
        case ADD_PROMOTION_ITEM_SUCCESS:
            return { 
                ...state, 
                loading: false, 
                error: null, 
                promotionItems: [...state.promotionItems, action.payload] // Assuming action.payload is the added promotion item
            };
            
        case CREATE_PROMOTION_FAILURE:
        case UPDATE_PROMOTION_FAILURE:
        case GET_PROMOTIONS_FAILURE:
        case GET_ACTIVE_PROMOTION_FAILURE:
        case ADD_PROMOTION_ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };
            
        default:
            return state;
    }
};
