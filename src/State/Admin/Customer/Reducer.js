import { GET_CUSTOMERS_FAILURE, GET_CUSTOMERS_SUCCESS, GET_CUSTOMERS_REQUEST } from "./ActionType";

const initialState = {
    customers: [],      
    loading: false,    
    error: null        
};

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CUSTOMERS_REQUEST:
            return {
                ...state,
                loading: true,    
                error: null       
            };
        case GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                loading: false,  
                customers: action.payload,
                error: null     
            };
        case GET_CUSTOMERS_FAILURE:
            return {
                ...state,
                loading: false,  
                customers: [], 
                error: action.payload 
            };
        default:
            return state;
    }
};

export default customersReducer;
