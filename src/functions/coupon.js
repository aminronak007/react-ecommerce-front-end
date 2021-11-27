import axios from "axios";
import { url } from "../config";

export const getCoupons = async () =>
  await axios.get(`${url}/api/coupon-details`);

export const removeCoupon = async (couponId) =>
  await axios.delete(`${url}/api/delete/coupon/${couponId}`);

export const createCoupon = async (coupon, user) =>
  await axios.post(`${url}/api/coupon`, { coupon, user });
