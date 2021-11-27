import React, { useState } from "react";
import { Form, Drawer, Button, Input, Row, Divider } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { url } from "../../../config";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [state, setState] = useState({ visible: false, childrenDrawer: false });
  const [email, setEmail] = useState("");

  const showDrawer = () => {
    setState({
      visible: true,
    });
  };

  const onClose = () => {
    setState({
      visible: false,
    });
  };

  const handleForgotPassword = () => {
    console.log(email);
    axios.post(`${url}/api/forgotpassword`, { email }).then((res) => {
      if (res.data.success) {
        toast.success(res.data.success);
      }
    });
  };

  return (
    <>
      <Row>
        <Link
          to="#"
          type="primary"
          style={{ color: "black", textDecorationLine: "none" }}
          onClick={showDrawer}
        >
          Forgot Password?
        </Link>
        <Drawer
          placement="top"
          closable={false}
          onClose={onClose}
          visible={state.visible}
          width="calc(500)"
        >
          <div className="container p-1">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <h4>Recover Your Password !!!</h4>
                <Divider />
                <Form
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input
                      name="email"
                      placeholder="Enter your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      onClick={handleForgotPassword}
                      type="primary"
                      style={{ paddingLeft: 61, paddingRight: 61 }}
                    >
                      Forgot Password ?
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </Drawer>
      </Row>
    </>
  );
};

export default ForgotPassword;
