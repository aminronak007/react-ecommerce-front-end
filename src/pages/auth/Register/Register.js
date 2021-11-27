import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { Row } from "antd";
import { Card } from "antd";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../../Components/Header/Header";

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    fname: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    axios.post("http://localhost:3000/api/register", user).then((res) => {
      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success(res.data.success);
        history.push("/login");
      }
    });
  };

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="col-md-6">User Registraton</h4>
            <Row>
              <Card
                className="responsive-image"
                title="Registration Form"
                style={{ width: 700 }}
              >
                <Form
                  onSubmit={handleSubmit}
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="text"
                      name="fname"
                      onChange={handleChange}
                      placeholder="Name"
                      value={user.fname}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={user.email}
                      placeholder="Email"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Mobile"
                    name="mobile"
                    rules={[{ required: true }]}
                  >
                    <Input
                      type="number"
                      name="mobile"
                      onChange={handleChange}
                      value={user.mobile}
                      placeholder="Mobile Number"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                  >
                    <Input.Password
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleChange}
                      placeholder="Password"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleChange}
                    rules={[{ required: true }]}
                  >
                    <Input.Password
                      type="password"
                      name="cpassword"
                      placeholder="Confirm Password"
                    />
                  </Form.Item>

                  <Form.Item
                    className="outer"
                    wrapperCol={{ offset: "calc(6)" }}
                  >
                    <Button
                      className="responsive-image"
                      style={{
                        minWidth: "calc(200)",
                        width: 180,
                        paddingLeft: "calc(52)",
                        paddingRight: "calc(52)",
                      }}
                      type="primary"
                      onClick={handleSubmit}
                    >
                      REGISTER
                    </Button>
                    <br></br>
                    <Link className="outer responsive-image" to="/login">
                      Already have an Account?
                    </Link>
                  </Form.Item>
                </Form>
              </Card>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
