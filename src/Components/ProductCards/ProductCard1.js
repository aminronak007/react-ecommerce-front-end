import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import defaultImage from "../../assets/Images/defaultImage.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
// import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import outofstock from "../../assets/Images/out-of-stock.png";

const { Meta } = Card;

const ProductCard1 = ({ product }) => {
  const { productName, description, price, images, slug } = product;
  const [tooltip, setToolTip] = useState("Click to Add");
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;

  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // Create Cart Array
    let cart = [];

    if (typeof window !== undefined) {
      // if cart is in local storage then GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // if cart is in Cookies then GET it
      // if (Cookies.get("cart")) {
      //   cart = JSON.parse(Cookies.get("cart"));
      // }

      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      // remover duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local Storage
      localStorage.setItem("cart", JSON.stringify(unique));

      // save to cookies
      // Cookies.set("cart", JSON.stringify(unique));

      // show Tool Tip
      setToolTip("Added");

      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });

      // show cart items in sidedrawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });

      axios
        .get(`http://localhost:3000`, {
          headers: {
            authorization,
          },
        })
        .then((res) => {
          dispatch({
            type: "SET_USER",
            payload: res.data,
          });
        });
    }
  };
  return (
    <>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No Ratings Yet</div>
      )}

      <Card
        hoverable
        style={{ width: 300, textAlign: "center" }}
        cover={
          <img
            alt="proImage"
            src={images && images.length ? images[0].url : defaultImage}
            height="250px"
            width="35px"
            style={{ marginTop: "12px" }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined className="text-info" /> <br /> View Product
          </Link>,
          <>
            {product.quantity < 1 ? (
              <Tooltip title="Out of Stock">
                <a disabled="disabled">
                  <img
                    style={{ height: "14px", width: "15px" }}
                    src={outofstock}
                  />
                  <br /> Out of Stock
                </a>
              </Tooltip>
            ) : (
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined className="text-danger" />
                  <br /> Add to Cart
                </a>
              </Tooltip>
            )}
          </>,
        ]}
      >
        <Meta
          style={{ textAlign: "left" }}
          title={productName}
          description={`Rs.${price} |  ${
            description && description.substring(0, 50)
          }...`}
        />
      </Card>
    </>
  );
};

export default ProductCard1;
