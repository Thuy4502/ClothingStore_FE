import { applyMiddleware, legacy_createStore, combineReducers } from "redux";
import { authReducer } from "./Auth/Reducer";
import { thunk } from "redux-thunk"; // Dùng cách import này
import { customerProductReducer } from "./Product/Reducer";
import { orderReducer } from "./Order/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { reviewReducer } from "./Review/Reducer";
import adminOrderReducer from "./Admin/Order/Reducer";
import { promotionReducer } from "./Promotion/Reducer";
import { statisticsReducer } from "./Statistic/Reducer";

// Kết hợp các reducer
const rootReducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  review: reviewReducer,
  adminOrder: adminOrderReducer,
  promotions: promotionReducer,
  statistics: statisticsReducer,
});

// Tạo store với middleware
export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
