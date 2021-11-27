import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";

import { createCoupon } from "../../../functions/coupon";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";
import { Card, Divider } from "antd";
import CouponForm from "../../../Components/AdminComponents/Forms/CouponsForm";

const CreateCoupon = ({ history }) => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createCoupon({ name, expiry, discount }, user)
      .then((res) => {
        setLoading(false);
        setName("");
        setExpiry("");
        setDiscount("");
        toast.success(`${res.data.name} is created`);
        history.push("/admin/coupons");
      })
      .catch((err) => {
        console.log("create coupon err", err);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "scroll initial",
      }}
    >
      <Sidebar />

      <div className="container-fluid p-4">
        <h4>Coupons</h4>
        <Divider></Divider>
        <Card title="ADD COUPONS" style={{ maxWidth: 500 }}>
          <CouponForm
            setName={setName}
            setExpiry={setExpiry}
            setDiscount={setDiscount}
            handleSubmit={handleSubmit}
            name={name}
            expiry={expiry}
            discount={discount}
            DatePicker={DatePicker}
          />
        </Card>
      </div>
    </div>
  );
};

export default CreateCoupon;
