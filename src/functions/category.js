import axios from "axios";
import { url } from "../config";

export const getCategories = async () =>
  await axios.get(`${url}/api/categories`);

export const getCategory = async (slug) =>
  await axios.get(`${url}/api/category/${slug}`);

export const removeCategory = async (slug) =>
  await axios.delete(`${url}/api/category/${slug}`);

export const updateCategory = async (slug, category) =>
  await axios.put(`${url}/api/category/${slug}`, category);

export const createCategory = async (categoryName) =>
  await axios.post(`${url}/api/category`, categoryName);

export const getCategorySubCategories = async (_id) =>
  await axios.get(`${url}/api/category/subCategories/${_id}`);
