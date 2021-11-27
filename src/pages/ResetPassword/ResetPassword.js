import React, { useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import { Row } from "antd";
import { Card } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useHistory, useParams } from "react-router";
import { url } from "../../config";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { id } = useParams();
  let history = useHistory();

  const handleSubmit = () => {
    axios
      .post(`${url}/api/resetpassword/${id}`, {
        newPassword,
        confirmPassword,
      })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.success);
          history.push("/login");
        } else {
          toast.error(res.data.error);
        }
      });
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4 className="col-md-6">Reset Password</h4>
          <Row>
            <Card
              className="responsive-image"
              title="Reset Your Password"
              style={{ width: 700 }}
            >
              <Form
                layout="vertical"
                name="basic"
                initialValues={{ remember: true }}
              >
                <Form.Item label="New Password" rules={[{ required: true }]}>
                  <Input.Password
                    onChange={(e) => setNewPassword(e.target.value)}
                    name="newPassword"
                    placeholder="New Password"
                  />
                </Form.Item>

                <Form.Item name="password" rules={[{ required: true }]}>
                  <Input.Password
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                  <br></br>
                </Form.Item>
                <Form.Item className="outer" wrapperCol={{ offset: "calc(6)" }}>
                  <Button
                    className="responsive-image"
                    style={{
                      minWidth: "calc(240)",
                      width: 240,
                      paddingLeft: "calc(100)",
                      paddingRight: "calc(100)",
                    }}
                    onClick={handleSubmit}
                    type="primary"
                  >
                    Reset Password
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
