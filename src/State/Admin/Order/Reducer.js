import { 
    CANCELED_ORDER_REQUEST, CONFIRMED_ORDER_FAILURE, CANCELED_ORDER_FAILURE, 
    CONFIRMED_ORDER_REQUEST, CONFIRMED_ORDER_SUCCESS, DELETE_ORDER_REQUEST, 
    DELETE_ORDER_SUCCESS, DELIVERED_ORDER_FAILURE, DELIVERED_ORDER_SUCCESS, 
    GET_ORDERS_FAILURE, GET_ORDERS_REQUEST, GET_ORDERS_SUCCESS, PLACED_ORDER_FAILURE, 
    PLACED_ORDER_REQUEST, PLACED_ORDER_SUCCESS, SHIP_ORDER_FAILURE, SHIP_ORDER_REQUEST, 
    SHIP_ORDER_SUCCESS, GET_ORDER_BY_ID_REQUEST, GET_ORDER_BY_ID_SUCCESS, 
    GET_ORDER_BY_ID_FAILURE 
} from "./ActionType";

const initialState = {
    loading: false,
    orders: [],
    orderDetails: null,  
    error: "",
};

const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: ""
            };
        case GET_ORDERS_FAILURE:
            return {
                loading: false,
                orders: [],
                error: action.payload,
            }
        case GET_ORDER_BY_ID_REQUEST:
            return {
                ...state,
                loading: true,  
            };
        case GET_ORDER_BY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                orderDetails: action.payload,  
                error: ""
            };
        case GET_ORDER_BY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                orderDetails: null,  
                error: action.payload,
            };
        case CONFIRMED_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
            }
        case CONFIRMED_ORDER_SUCCESS:
            return {
                ...state,
                confirmed: action.payload,
                isLoading: false,
            };
        case PLACED_ORDER_SUCCESS:
            return {
                ...state,
                placed: action.payload,
                isLoading: false,
            };
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                delivered: action.payload,
                isLoading: false,
            }
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                isLoading: false,
            }
        case DELETE_ORDER_REQUEST:
            return { ...state, loading: true };
        case DELETE_ORDER_SUCCESS:
            console.log('Before delete:', state.orders);
            const updatedOrders = state.orders.filter(order => order.orderId !== action.payload);
            console.log('After delete:', updatedOrders);
            return {
                ...state,
                loading: false,
                orders: updatedOrders
            };

        case SHIP_ORDER_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null,
            }
        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                shipped: action.payload
            }
        case SHIP_ORDER_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}

export default adminOrderReducer;
