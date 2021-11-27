import React, { useEffect, useState } from "react";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { Card, Divider, Typography } from "antd";
import { getProduct, updateProduct } from "../../../functions/product";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import UpdateProductForm from "../../../Components/AdminComponents/Forms/UpdateProductForm";
import {
  getCategories,
  getCategorySubCategories,
} from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";

const { Title } = Typography;

const UpdateProduct = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategoriesOptions, setSubCategoriesOptions] = useState([]);

  let { slug } = useParams();
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

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = () => {
    getProduct(slug).then((res) => {
      setValues({ ...values, ...res.data.product });
      getCategorySubCategories(res.data.product.category._id).then((s) => {
        setSubCategoriesOptions(s.data.subCategory);
      });
    });
  };

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    updateProduct(slug, values)
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          toast.success(`${res.data.updated.productName} is added.`);
          history.push("/admin/products");
        }
        toast.error(res.data.error);
        console.log("updateSuccess", res);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.error);
        console.log("update", err);
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
      subCategory: [],
      category: e.target.value,
    });
    getCategorySubCategories(e.target.value).then((res) => {
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
                <Title level={4}>Update Product</Title>
              )}
              {/* {JSON.stringify(values)} */}

              <Divider></Divider>
              <Card title="Update PRODUCT" style={{ maxWidth: 1220 }}>
                <UpdateProductForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  handleCategoryChange={handleCategoryChange}
                  categories={categories}
                  subCategoriesOptions={subCategoriesOptions}
                />
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
