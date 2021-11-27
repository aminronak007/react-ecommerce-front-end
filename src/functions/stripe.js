import axios from "axios";
import { url } from "../config";

export const createPaymentIntent = (user, coupon) =>
  axios.post(`${url}/api/create-payment-intent`, {
    user,
    couponApplied: coupon,
  });
