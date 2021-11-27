import React, { useEffect, useState } from "react";
import { Badge, Menu } from "antd";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Icon from "../Icon/Icon";
import Icon2 from "../Icon/Icon2";
import { getCategories } from "../../functions/category";

import { useSelector, useDispatch } from "react-redux";

const { SubMenu, Item } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const token = Cookies.get("accessToken");
  const googleToken = Cookies.get("googleToken");
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();
  const [categories, setCategories] = useState([]);

  const { cart, user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/login`, {
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
    loadCategories();
  }, [categories]);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  const handleCart = () => {
    if (currentUser.id) {
      history.push("/cart");
    } else {
      toast.error("Please login to view the cart");
      history.push("/login");
    }
  };

  const handleSignOut = (e) => {
    Cookies.remove("accessToken");
    Cookies.remove("googleToken");
    history.replace("/");
    return toast.info("Logged Out Successfully");
  };

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      style={{ width: "calc(100)" }}
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      theme="dark"
    >
      <Item>
        <Link
          to="/"
          style={{
            fontSize: 24,
            fontWeight: "bolder",
            textDecorationLine: "none",
          }}
        >
          MERN STORE
        </Link>
      </Item>

      {/* <SubMenu
        icon={<Icon />}
        style={{ fontWeight: "bolder", fontFamily: "serif" }}
        title="Shop"
      >
        {categories.map((item) => {
          return (
            <Item key={item._id}>
              <Link
                style={{ textDecorationLine: "none" }}
                to={`/category/${item.slug}`}
              >
                {item.categoryName}
              </Link>
            </Item>
          );
        })}
      </SubMenu> */}
      <Item key="shop">
        <Link style={{ textDecorationLine: "none" }} to="/shop">
          <Icon /> <i class="fas">Shop</i>
        </Link>
      </Item>

      {/* <Item key="contact">
        <Link style={{ textDecorationLine: "none" }} to="/contact">
          <i class="fas fa-id-card-alt">&nbsp; Contact</i>
        </Link>
      </Item>
      <Item key="about">
        <Link style={{ textDecorationLine: "none" }} to="/about">
          <i class="fas fa-info-circle">&nbsp; About</i>
        </Link>
      </Item> */}
      {currentUser.id || googleToken ? (
        <Item key="cart">
          <Link
            onClick={handleCart}
            style={{ textDecorationLine: "none" }}
            to="/cart"
          >
            <i class="fas fa-cart-arrow-down">
              &nbsp;
              <Badge
                style={{ color: "white" }}
                count={cart.length}
                offset={[9, 0]}
              >
                Cart
              </Badge>
            </i>
          </Link>
        </Item>
      ) : (
        <Item key="cart">
          <Link
            onClick={handleCart}
            style={{ textDecorationLine: "none" }}
            to="/login"
          >
            <i class="fas fa-cart-arrow-down">
              &nbsp;
              <Badge
                style={{ color: "white" }}
                count={cart.length}
                offset={[9, 0]}
              >
                Cart
              </Badge>
            </i>
          </Link>
        </Item>
      )}

      {currentUser.id || googleToken ? (
        <>
          <SubMenu
            icon={<Icon2 />}
            style={{ fontWeight: "bolder", fontFamily: "serif" }}
            title="My Account"
          >
            {/* <Item key="profile">
              <Link to="/" style={{ textDecorationLine: "none" }}>
                <i class="fas fa-user"> &nbsp;Profile</i>
              </Link>
            </Item> */}
            <Item key="myOrders">
              <Link to="/user/history" style={{ textDecorationLine: "none" }}>
                <i class="fas fa-list-ul"> &nbsp;My Orders</i>
              </Link>
            </Item>
            <Item key="signout">
              <a href="/" onClick={handleSignOut} type="text">
                <i class="fas fa-sign-out-alt"> &nbsp;Logout</i>
              </a>
            </Item>
          </SubMenu>
        </>
      ) : (
        <>
          <Item key="register">
            <Link style={{ textDecorationLine: "none" }} to="/register">
              <i class="fas fa-user">&nbsp; Register</i>
            </Link>
          </Item>

          <Item key="login">
            <Link style={{ textDecorationLine: "none" }} to="/login">
              <i class="fas fa-sign-in-alt">&nbsp; Login</i>
            </Link>
          </Item>
        </>
      )}
    </Menu>
  );
};

export default Header;
