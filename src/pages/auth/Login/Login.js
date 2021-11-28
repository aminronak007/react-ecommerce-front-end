import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider } from "antd";
import { Row } from "antd";
import { Card } from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleButton from "react-google-button";
import { googleAuthProvider } from "../../../firebase";
import Cookies from "js-cookie";
import firebase from "../../../firebase";
import ForgotPassword from "../../Home/ForgotPassword/ForgotPassword";
import { useDispatch } from "react-redux";

const Login = () => {
  const token = Cookies.get("accessToken");
  const dispatch = useDispatch();

  const history = useHistory();
  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (token) history.push("/");
    }
  }, [token, history]);
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

  const handleGoogleLogin = () => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        // /** @type {firebase.auth.OAuthCredential} */
        // console.log(result);
        const credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = credential.accessToken;
        Cookies.set("googleToken", token);
        // The signed-in user info.
        // const user = result.user;
        toast.info("Google Login Successfully");
        history.push("/");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        if (error) return console.log(error);
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // // The email of the user's account used.
        // const email = error.email;
        // // The firebase.auth.AuthCredential type that was used.
        // const credential = error.credential;
        // ...
      });
  };

  const handleClick = () => {
    let intended = history.location.state;

    axios
      .post("http://localhost:3000/api/login", user, {
        withCredentials: true,
      })
      .then((res) => {
        if (intended) {
          history.push(intended.from);
        } else {
          if (res.data.error) {
            toast.error(res.data.error);
          } else {
            toast.info(res.data.success);
            history.push("/");
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h4 className="col-md-6">User Login</h4>
            <Row>
              <Card title="Login" style={{ width: 700 }}>
                <Form
                  className="responsive-image"
                  onSubmit={handleSubmit}
                  layout="vertical"
                  name="basic"
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    label="Username"
                    name="email"
                    rules={[{ required: true }]}
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
                      onChange={handleChange}
                      placeholder="Password"
                    />
                    <br></br>

                    <ForgotPassword />
                  </Form.Item>
                  <Form.Item
                    className="outer"
                    wrapperCol={{ offset: "calc(6)" }}
                  >
                    <Button
                      className="responsive-image"
                      style={{
                        minWidth: "calc(240)",
                        width: 240,
                        paddingLeft: "calc(100)",
                        paddingRight: "calc(100)",
                      }}
                      onClick={handleClick}
                      type="primary"
                    >
                      LOGIN
                    </Button>
                  </Form.Item>

                  <Divider plain>OR</Divider>

                  <Form.Item
                    className="outer"
                    wrapperCol={{ offset: "calc(6)" }}
                  >
                    <GoogleButton
                      className="responsive-image"
                      onClick={handleGoogleLogin}
                      label="Sign in with Google"
                      block
                    />
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

export default Login;
