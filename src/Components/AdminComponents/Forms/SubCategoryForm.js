import { Button, Form, Input } from "antd";
import React from "react";
import { useParams } from "react-router";

const SubCategoryForm = ({
  handleSubmit,
  subCategoryName,
  setSubCategoryName,
}) => {
  const { slug } = useParams();

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Sub Category Name"
          rules={[
            {
              required: true,
              message: "Please input Category Name!",
            },
          ]}
        >
          <Input
            onChange={(e) => setSubCategoryName(e.target.value)}
            type="text"
            value={subCategoryName}
            placeholder="Enter Sub Category Name"
          />
        </Form.Item>

        <Form.Item
          className="outer"
          wrapperCol={{ span: 9, offset: "calc(6)" }}
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
      </Form>
    </>
  );
};

export default SubCategoryForm;
