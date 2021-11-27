import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { Card, Divider, Typography } from "antd";
import { createProduct } from "../../../functions/product";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import ProductForm from "../../../Components/AdminComponents/Forms/ProductForm";
import {
  getCategories,
  getCategorySubCategories,
} from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;

const CreateProducts = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    subCategory: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Gold", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Oneplus", "Vivo", "Oppo", "Xiaomi"],
    color: "",
    brand: "",
  });
  const [categories, setCategories] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values)
      .then((res) => {
        if (res.data.productName) {
          toast.success(`${res.data.productName} is added.`);
          history.push("/admin/products");
        }
        toast.error(res.data.error);
      })
      .catch((err) => {
        console.log(err);
        // setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      category: e.target.value,
    });
    getCategorySubCategories(e.target.value).then((res) => {
      console.log(res);
      setSubCategoriesOptions(res.data.subCategory);
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "calc(100vh)",
          overflow: "scroll initial",
        }}
      >
        <Sidebar />
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-md-12">
              {loading ? (
                <LoadingOutlined />
              ) : (
                <Title level={4}>Add New Product</Title>
              )}
              <Divider></Divider>
              <Card title="ADD PRODUCT" style={{ maxWidth: 1220 }}>
                <ProductForm
                  handleSubmit={handleSubmit}
                  values={values}
                  handleChange={handleChange}
                  categories={categories}
                  handleCategoryChange={handleCategoryChange}
                  subCategoriesOptions={subCategoriesOptions}
                  setValues={setValues}
                  setLoading={setLoading}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProducts;
