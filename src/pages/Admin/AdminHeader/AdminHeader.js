import React, { useState } from "react";
import { Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const { Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");

  const history = useHistory();
  const handleSignOut = (e) => {
    Cookies.remove("adminToken");
    history.push("/admin");
    return toast.info("Logged Out Successfully");
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      theme="dark"
      style={{ width: "calc(100)" }}
      defaultOpenKeys={["shop"]}
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
    >
      <Item>
        <Link
          to="/admin/dashboard"
          style={{
            fontSize: 24,
            fontWeight: "bolder",
            textDecorationLine: "none",
          }}
        >
          MERN STORE ADMIN
        </Link>
      </Item>

      <Item className="align-right" key="categories">
        <Link to="/admin/categories">
          <i class="fa fa-align-justify"> &nbsp;Categories</i>
        </Link>
      </Item>
      <Item className="align-right" key="products">
        <Link to="/admin/products">
          <i class="fas fa-dolly-flatbed"> &nbsp;Products</i>
        </Link>
      </Item>
      <Item className="align-right" key="orders">
        <Link to="/admin">
          <i class="fab fa-first-order">
            &nbsp;<b> Orders</b>
          </i>
        </Link>
      </Item>
      <Item className="align-right" key="signout">
        <Link onClick={handleSignOut}>
          <i class="fas fa-sign-out-alt"> &nbsp;Logout</i>
        </Link>
      </Item>
    </Menu>
  );
};

export default Header;
