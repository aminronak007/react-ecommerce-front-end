import { Card, Image } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import categoryImage from "../../../assets/Images/AdminDashboardImages/category.png";
import productImage from "../../../assets/Images/AdminDashboardImages/product.png";
import ordersImage from "../../../assets/Images/AdminDashboardImages/orders.jpg";
import subcategoryImage from "../../../assets/Images/AdminDashboardImages/subcategory.png";
import coupon from "../../../assets/Images/AdminDashboardImages/coupon.png";

import { Typography } from "antd";
import Sidebar from "../../../Components/AdminComponents/Nav/Sidebar";

const { Title } = Typography;

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({});
  const token = Cookies.get("adminToken");
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <>
      {currentUser.id || token ? (
        <>
          <div style={{ display: "flex" }} className="sidebar-div">
            <Sidebar />

            <div className="container-fluid p-4">
              <div className="row">
                <div
                  style={{ textAlign: "center", marginTop: "1vh" }}
                  className="col-md-6 col-lg-4"
                >
                  <Card>
                    <Image src={categoryImage} width={75} preview={false} />
                    <Link
                      style={{ textDecorationLine: "none" }}
                      to="/admin/categories"
                    >
                      <Title level={4}>Categories</Title>
                    </Link>
                    <Title level={5}>View all Categories</Title>
                  </Card>
                </div>
                <div
                  style={{ textAlign: "center", marginTop: "1vh" }}
                  className="col-md-6 col-lg-4"
                >
                  <Card>
                    <Image src={subcategoryImage} width={75} preview={false} />
                    <Link
                      style={{ textDecorationLine: "none" }}
                      to="/admin/sub-categories"
                    >
                      <Title level={4}>Sub Categories</Title>
                    </Link>
                    <Title level={5}>View all Sub Categories</Title>
                  </Card>
                </div>
                <div
                  style={{ textAlign: "center", marginTop: "1vh" }}
                  className="col-md-6 col-lg-4"
                >
                  <Card>
                    <Image src={productImage} width={92} preview={false} />
                    <Link
                      style={{ textDecorationLine: "none" }}
                      to="/admin/products"
                    >
                      <Title level={4}>Products</Title>
                    </Link>
                    <Title level={5}>View all Products</Title>
                  </Card>
                </div>
                <div
                  style={{ textAlign: "center", marginTop: "1vh" }}
                  className="col-md-6 col-lg-4"
                >
                  <Card>
                    <Image src={ordersImage} width={75} preview={false} />
                    <Link
                      style={{ textDecorationLine: "none" }}
                      to="/admin/orders"
                    >
                      <Title level={4}>Orders</Title>
                    </Link>
                    <Title level={5}>View all Orders</Title>
                  </Card>
                </div>
                <div
                  style={{ textAlign: "center", marginTop: "1vh" }}
                  className="col-md-6 col-lg-4"
                >
                  <Card>
                    <Image src={coupon} width={75} preview={false} />
                    <Link
                      style={{ textDecorationLine: "none" }}
                      to="/admin/coupons"
                    >
                      <Title level={4}>Coupons</Title>
                    </Link>
                    <Title level={5}>View all Coupons</Title>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        history.push("/admin")
      )}
    </>
  );
};

export default Dashboard;
