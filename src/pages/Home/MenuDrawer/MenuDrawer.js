import React, { useState } from "react";
import { Drawer, Row } from "antd";
import { Link } from "react-router-dom";

const MenuDrawer = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Row>
        <Link
          to="#"
          type="primary"
          style={{ textDecorationLine: "none" }}
          onClick={showDrawer}
        >
          Forgot Password?
        </Link>

        <Drawer
          style={{ display: "flex" }}
          placement="left"
          width={400}
          visible={visible}
          onClose={onClose}
        >
          <div className="container p-3">
            <div style={{ display: "flex" }} className="row">
              <h6
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  fontSize: 12,
                  fontWeight: "bolder",
                }}
              >
                LANDING PAGES
              </h6>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      textDecorationLine: "none",
                      fontSize: 14,
                      fontFamily: "Inter, sans-serif",
                    }}
                    className="menu-text-color"
                    to="#"
                  >
                    Advertisments
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Marketing
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Course
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Design Agency
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Application
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Travel
                  </Link>
                </div>
              </div>
              <div style={{ marginBottom: 10 }} className="col-md-6">
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Payment App
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Software Company
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Crypto Currency
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Consulting
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Domain Hosting
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Event
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <h6
                style={{
                  marginTop: 15,
                  fontSize: 12,
                  fontWeight: "bolder",
                }}
              >
                SUPPORTING PAGES
              </h6>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    About
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Contact
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Customers
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    FAQ
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Coming Soon
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Cover
                  </Link>
                </div>
              </div>
              <div style={{ marginBottom: 10 }} className="col-md-6">
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Services
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Pricing
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Hire Us
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Privacy Policy
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Maintenance Mode
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Not Found
                  </Link>
                </div>
              </div>
            </div>
            <div className="row">
              <h6
                style={{
                  marginTop: 15,
                  fontSize: 12,
                  fontWeight: "bolder",
                }}
              >
                AUTH PAGES
              </h6>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Login
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Sign Up
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <div style={{ marginBottom: 10 }} className="col-md-6">
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Login Simple
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Sign Up Simple
                  </Link>
                </div>
                <div style={{ marginBottom: 10 }} className="row">
                  <Link
                    style={{
                      color: "black",
                      textDecorationLine: "none",
                      fontSize: 14,
                    }}
                    to="#"
                  >
                    Forgot Password Simple
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </Row>
    </>
  );
};

export default MenuDrawer;
