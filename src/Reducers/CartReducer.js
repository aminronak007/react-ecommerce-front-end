import Cookies from "js-cookie";
let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("cart")) {
    initialState = JSON.parse(localStorage.getItem("cart"));
  } else {
    initialState = [];
  }
  if (Cookies.get("cart")) {
    initialState = JSON.parse(Cookies.get("cart"));
  } else {
    initialState = [];
  }
}

export const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};
