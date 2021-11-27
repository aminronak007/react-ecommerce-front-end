import { Button, Form, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router";
import ImageUpload from "../ImageUpload/ImageUpload";

const { TextArea } = Input;

const ProductForm = ({
  handleSubmit,
  values,
  handleChange,
  categories,
  handleCategoryChange,
  subCategoriesOptions,
  setValues,
  setLoading,
}) => {
  const { slug } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");

  const {
    productName,
    description,
    price,
    category,
    subCategory,
    quantity,
    colors,
    brands,
  } = values;

  const handleSelectCategory = () => {
    axios
      .post("http://localhost:3000/api/categoryname", { category })
      .then((res) => {
        setCategoryName(res.data);
      });
  };

  const handleSelectSubCategory = () => {
    axios
      .post("http://localhost:3000/api/subcategoryname", { subCategory })
      .then((res) => {
        setSubCategoryName(res.data);
      });
  };
  return (
    <>
      <Form
        onSubmit={handleSubmit}
        name="basic"
        initialValues={{ remember: true }}
      >
        <div className="row">
          <div className="col-md-6">
            <Form.Item label="Category">
              <select
                name="category"
                defaultValue="select"
                className="responsive form-control"
                onChange={handleCategoryChange}
                onClick={handleSelectCategory}
              >
                <option value="select">Please Select Category</option>
                {categories.map((item) => {
                  return (
                    <>
                      <option key={item._id} value={item._id}>
                        {item.categoryName}
                      </option>
                    </>
                  );
                })}
              </select>
            </Form.Item>

            <Form.Item label="Product Name">
              <Input
                onChange={handleChange}
                name="productName"
                type="text"
                value={productName}
                placeholder="Enter Product Name"
              />
            </Form.Item>

            <Form.Item label="Product Quantity">
              <Input
                onChange={handleChange}
                name="quantity"
                type="number"
                value={quantity}
                placeholder="Enter Product Quantity"
              />
            </Form.Item>

            <Form.Item label="Color">
              <select
                name="color"
                defaultValue="select"
                className="responsive form-control"
                onChange={handleChange}
              >
                <option value="select">Please Select Color</option>
                {colors.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
            <Form.Item label="Brand">
              <select
                name="brand"
                defaultValue="select"
                className="responsive form-control"
                onChange={handleChange}
              >
                <option value="select">Please Select Brand</option>
                {brands.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </Form.Item>
            <div className="row">
              <div className="col-md-12">
                <ImageUpload
                  values={values}
                  setValues={setValues}
                  setLoading={setLoading}
                  categoryName={categoryName}
                  subCategoryName={subCategoryName}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            {subCategoriesOptions && subCategoriesOptions.length ? (
              <Form.Item label="Sub Category">
                <select
                  name="subCategory"
                  defaultValue="select"
                  className="responsive form-control"
                  onChange={handleChange}
                  onClick={handleSelectSubCategory}
                >
                  <option>Please Select Sub Category</option>
                  {subCategoriesOptions.map((item) => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.subCategoryName}
                      </option>
                    );
                  })}
                </select>
              </Form.Item>
            ) : !subCategoriesOptions ? null : null}
            <Form.Item label="Product Price">
              <Input
                onChange={handleChange}
                name="price"
                type="number"
                value={price}
                placeholder="Enter Product Price"
              />
            </Form.Item>

            <Form.Item label="Product Description">
              <TextArea
                onChange={handleChange}
                rows={4}
                name="description"
                type="text"
                value={description}
                placeholder="Enter Product Description"
              />
            </Form.Item>

            <Form.Item label="Shipping">
              <select
                name="shipping"
                defaultValue="select"
                className="responsive form-control"
                onChange={handleChange}
              >
                <option value="select">Please Select</option>
                <option value="No">No</option>
                <option value="Yes">Yes</option>
              </select>
            </Form.Item>
          </div>

          <Form.Item
            className="outer"
            wrapperCol={{ span: 12, offset: "calc(6)" }}
          >
            {slug ? (
              <Button onClick={handleSubmit} type="primary" htmlType="submit">
                Update
              </Button>
            ) : (
              <Button onClick={handleSubmit} type="primary" htmlType="submit">
                Add
              </Button>
            )}
          </Form.Item>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
