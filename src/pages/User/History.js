import React, { useEffect, useState } from "react";
import { getUserOrders } from "../../functions/user";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Cookies from "js-cookie";
import axios from "axios";
import ShowPaymentInfo from "../../Components/ProductCards/ShowPaymentInfo";
import { StyleSheet, PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../Components/Orders/Invoice";

const History = () => {
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = () => {
    axios
      .get("http://localhost:3000", {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      });
  };

  useEffect(() => {
    loadUserOrders();
  }, [user]);

  const loadUserOrders = () => {
    getUserOrders(user).then((res) => {
      //   console.log(res);
      setOrders(res.data.userOrders);
    });
  };

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Product Name</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Qty</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>
      <tbody>
        {order.products && order.products.length > 0
          ? order.products.map((p, i) => (
              <tr key={i}>
                <td>
                  <b>{p.product.productName}</b>
                </td>
                <td> {p.product.price}</td>
                <td> {p.product.brand}</td>
                <td> {p.color}</td>
                <td> {p.count}</td>
                <td>
                  {p.product.shipping === "Yes" ? (
                    <CheckCircleOutlined style={{ color: "green" }} />
                  ) : (
                    <CloseCircleOutlined style={{ color: "red" }} />
                  )}
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName={`Invoice.pdf`}
      className="btn btn-sm btn-outline-primary"
    >
      Download PDF
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders &&
    orders.length > 0 &&
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col text-center p-5">
          <h3>
            {orders && orders.length > 0
              ? "User Purchase Orders"
              : "No Purchase Orders"}
          </h3>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
