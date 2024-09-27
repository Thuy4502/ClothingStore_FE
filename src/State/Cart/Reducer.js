import { 
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    ADD_ITEM_TO_CART_FAILURE,
    GET_CART_REQUEST,
    GET_CART_SUCCESS,
    GET_CART_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE 
} from "./ActionType";

const initialState = {
    cart: null,
    loading: false,
    error: null,
    cartItems: [],
    data: [], // Đảm bảo data luôn là mảng
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ITEM_TO_CART_REQUEST:
            return { ...state, loading: true, error: null };
        
        case ADD_ITEM_TO_CART_SUCCESS:
            return {
                ...state,
                cartItems: Array.isArray(action.payload.cartItems) ? action.payload.cartItems : state.cartItems,
                cart: action.payload,
                data: Array.isArray(state.data) ? [...state.data, action.payload.data] : [action.payload.data],
                loading: false
            };
        
        case ADD_ITEM_TO_CART_FAILURE:
            return { ...state, loading: false, error: action.payload };
        
        case GET_CART_REQUEST:
            return { ...state, loading: true, error: null };
        
        case GET_CART_SUCCESS:
            return { 
                ...state, 
                cartItems: Array.isArray(action.payload.cartItems) ? action.payload.cartItems : [], 
                cart: action.payload, 
                loading: false 
            };
        
        case GET_CART_FAILURE:
            return { ...state, error: action.payload, loading: false };
        
        case REMOVE_CART_ITEM_REQUEST:
        case UPDATE_CART_ITEM_REQUEST:
            return { ...state, loading: true, error: null };
        
        case REMOVE_CART_ITEM_SUCCESS:
            return {
                ...state, 
                deleteCartItem: action.payload,
                loading: false,
            };
        
        case UPDATE_CART_ITEM_SUCCESS:
            return {
                ...state,
                updateCartItem: action.payload,
                loading: false,
            };
        
        case REMOVE_CART_ITEM_FAILURE:
        case UPDATE_CART_ITEM_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        default:
            return state;
    }
}
