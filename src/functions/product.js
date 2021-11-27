import axios from "axios";
import { url } from "../config";

export const getProducts = async (count) =>
  await axios.get(`${url}/api/products/${count}`);

export const getProduct = async (slug) =>
  await axios.get(`${url}/api/product/${slug}`);

export const removeProduct = async (slug) =>
  await axios.delete(`${url}/api/product/${slug}`);

export const updateProduct = async (slug, product) =>
  await axios.put(`${url}/api/product/${slug}`, product);

export const createProduct = async (product) =>
  await axios.post(`${url}/api/product`, product);

export const listProducts = async (sort, order, page) =>
  await axios.post(`${url}/api/products`, {
    sort,
    order,
    page,
  });

export const getProductsCount = async () =>
  await axios.post("${url}/api/products/total");

export const productStar = async (productId, star, userEmail) =>
  await axios.put(`${url}/api/product/star/${productId}`, {
    star,
    userEmail,
  });

export const getRelated = async (productId) =>
  await axios.get(`${url}/api/product/related/${productId}`);

export const fetchProductsByFilter = async (arg) =>
  await axios.post(`${url}/api/search/filters`, arg);
