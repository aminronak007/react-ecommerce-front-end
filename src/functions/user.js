import axios from "axios";
import { url } from "../config";

export const userCart = async (cart, currentUser) =>
  axios.post(`${url}/api/user/cart`, { cart, currentUser });

export const getUserCart = async (user) =>
  axios.post(`${url}/api/user/cart-details`, { user });

export const emptyUserCart = async (user) =>
  axios.put(`${url}/api/user/update/cart`, { user });

export const saveUserAddress = async (user, address) =>
  axios.post(`${url}/api/user/address`, { user, address });

export const getUserAddress = async (user) =>
  axios.post(`${url}/api/user/address-details`, { user });

export const applyCoupon = async (user, coupon) =>
  axios.post(`${url}/api/user/cart/coupon`, { user, coupon });

export const createOrder = async (user, stripeResponse) =>
  axios.post(`${url}/api/user/order`, {
    user,
    stripeResponse,
  });

export const getUserOrders = async (user) =>
  axios.post(`${url}/api/orders`, {
    user,
  });

export const getWishlist = async (user) =>
  axios.post(`${url}/api/user/wishlist`, {
    user,
  });

export const addToWishlist = async (productId, user) =>
  axios.post(`${url}/api/user/add/wishlist`, {
    productId,
    user,
  });

export const removeFromWishlist = async (productId, user) =>
  axios.put(`${url}/api/user/wishlist/${productId}`, {
    productId,
    user,
  });

export const createCODOrder = async (user, COD, coupon) =>
  axios.post(`${url}/api/user/cash-order`, {
    user,
    COD,
    couponApplied: coupon,
  });
