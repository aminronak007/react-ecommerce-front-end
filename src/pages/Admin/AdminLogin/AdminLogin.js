import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Row } from "antd";
import { Card } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ForgotPassword from "../../Home/ForgotPassword/ForgotPassword";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const token = Cookies.get("adminToken");
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCurrentUser(res.data);
        if (currentUser.id) {
          history.push("/admin/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleClick = () => {
    axios
      .post("http://localhost:3000/api/admin/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.error) {
          toast.error(res.data.error);
        } else {
          toast.info(res.data.success);
          history.push("/admin/dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const LoginForm = () => {
    return (
      <>
        <Form
          onSubmit={handleSubmit}
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="Username"
            name="email"
            rules={[{ required: true, message: "Please input Category Name!" }]}
          >
            <Input
              onChange={handleChange}
              name="email"
              value={user.email}
              placeholder="Enter Email or Username"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password
              name="password"
              value={user.password}
              onChange={(e) => handleChange(e)}
              placeholder="Password"
            />
            <br></br>

            <ForgotPassword />
          </Form.Item>

          <Form.Item className="outer" wrapperCol={{ offset: "calc(6)" }}>
            <Button
              style={{ paddingLeft: 100, paddingRight: 100 }}
              onClick={handleClick}
              type="primary"
            >
              LOGIN
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="col-md-6">ADMIN LOGIN</h4>
          <Row>
            <Card title="Login" style={{ maxWidth: 700, width: 650 }}>
              {LoginForm()}
            </Card>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
