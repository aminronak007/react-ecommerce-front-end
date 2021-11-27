import { combineReducers } from "redux";
import { CartReducer } from "./CartReducer";
import { DrawerReducer } from "./DrawerReducer";
import { UserReducer } from "./UserReducer";
import { CouponReducer } from "./CouponReducer";
import { SearchReducer } from "./SearchReducer";
import { CODReducer } from "./CODReducer";

const rootReducer = combineReducers({
  cart: CartReducer,
  drawer: DrawerReducer,
  user: UserReducer,
  coupon: CouponReducer,
  search: SearchReducer,
  COD: CODReducer,
});

export default rootReducer;
