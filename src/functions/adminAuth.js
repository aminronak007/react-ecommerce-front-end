import axios from "axios";
import Cookies from "js-cookie";
import { url } from "../config";

export const getAdminAuth = async () => {
  const token = Cookies.get("adminToken");

  const adminAuth = await axios.get(`${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return adminAuth;
};

export const getOrders = async () => await axios.get(`${url}/api/admin/orders`);

export const changeStatus = async (orderId, orderStatus, admin) =>
  await axios.put(`${url}/api/admin/order-status`, {
    orderId,
    orderStatus,
    admin,
  });
