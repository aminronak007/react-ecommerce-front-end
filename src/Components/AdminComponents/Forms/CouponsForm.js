import { Button, Form, Input } from "antd";
import React from "react";
import { useParams } from "react-router";

const CouponForm = ({
  setName,
  setExpiry,
  setDiscount,
  handleSubmit,
  name,
  expiry,
  discount,
  DatePicker,
}) => {
  const { slug } = useParams();

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        name="basic"
        initialValues={{ remember: true }}
      >
        <Form.Item label="Coupon Name">
          <Input
            onChange={(e) => setName(e.target.value)}
            type="text"
            value={name}
            placeholder="Enter Coupon Name"
            required
          />
        </Form.Item>

        <Form.Item label="Discount %">
          <Input
            onChange={(e) => setDiscount(e.target.value)}
            type="text"
            value={discount}
            placeholder="Enter Discount"
            required
          />
        </Form.Item>

        <Form.Item label="Expiry Date">
          <DatePicker
            className="form-control"
            selected={new Date()}
            onChange={(date) => setExpiry(date)}
            value={expiry}
            required
          />
        </Form.Item>

        <Form.Item
          className="outer"
          wrapperCol={{ span: 12, offset: "calc(1)" }}
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

export default CouponForm;
