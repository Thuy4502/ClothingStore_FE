import { 
    deleteProduct, 
    updateProduct 
  } from "./Action";
  import { 
    FIND_PRODUCT_BY_ID_FAILURE, 
    FIND_PRODUCT_BY_ID_REQUEST, 
    FIND_PRODUCTS_FAILURE, 
    FIND_PRODUCTS_SUCCESS, 
    FIND_PRODUCT_BY_ID_SUCCESS, 
    FIND_PRODUCTS_REQUEST, 
    DELETE_PRODUCTS_SUCCESS,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE
  } from "./ActionType";
  
  const initialState = {
      products: [],
      product: null,
      loading: false,
      error: null,
      deletedProduct: null,
      updatedProduct: null
  };
  
  export const customerProductReducer = (state = initialState, action) => {
      switch (action.type) {
          case FIND_PRODUCTS_REQUEST:
          case FIND_PRODUCT_BY_ID_REQUEST:
          case UPDATE_PRODUCT_REQUEST:
              return { ...state, loading: true, error: null };
          case FIND_PRODUCTS_SUCCESS:
              return { ...state, loading: false, error: null, products: action.payload };
          case FIND_PRODUCT_BY_ID_SUCCESS:
              return { ...state, loading: false, error: null, product: action.payload };
          case DELETE_PRODUCTS_SUCCESS:
              return { ...state, loading: false, error: null, deletedProduct: action.payload };
          case UPDATE_PRODUCT_SUCCESS:
              return { ...state, loading: false, error: null, updatedProduct: action.payload };
          case FIND_PRODUCTS_FAILURE:
          case FIND_PRODUCT_BY_ID_FAILURE:
          case UPDATE_PRODUCT_FAILURE:
              return { ...state, loading: false, error: action.payload };
          default:
              return state;
      }
  };
  