import axios from "axios";
import { url } from "../config";

export const getSubCategories = async () =>
  await axios.get(`${url}/api/subCategories`);

export const getSubCategory = async (slug) =>
  await axios.get(`${url}/api/subCategory/${slug}`);

export const removeSubCategory = async (slug) =>
  await axios.delete(`${url}/api/subCategory/${slug}`);

export const updateSubCategory = async (slug, subCategory) =>
  await axios.put(`${url}/api/subCategory/${slug}`, subCategory);

export const createSubCategory = async (subCategoryName) =>
  await axios.post(`${url}/api/subCategory`, subCategoryName);
