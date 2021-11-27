import React, { useEffect, useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import DefaultImage from "../../assets/Images/defaultImage.png";
import ProductItems from "./ProductItems";
import StarRating from "react-star-ratings";
import RatingModal from "../Modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { addToWishlist } from "../../functions/user";
import _ from "lodash";
// import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../../config";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import outofstock from "../../assets/Images/out-of-stock.png";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {
  const { _id, productName, images, description } = product;
  const [tooltip, setToolTip] = useState("Click to Add");
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;
  let history = useHistory();

  useEffect(() => {
    loadUser();
  });

  const loadUser = () => {
    axios
      .get(`${url}`, {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        // console.log(res);
        setUser(res.data);
      });
  };

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
    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user).then((res) => {
      // console.log("add", res);
      toast.success("Added to Wishlist");
      history.push("/wishlist");
    });
  };

  return (
    <>
      <div className="col-lg-6">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((i) => {
                return <img src={i.url} key={i.public_id} />;
              })}
          </Carousel>
        ) : (
          <Card cover={<img src={DefaultImage} class="card-image" />}></Card>
        )}
      </div>
      <div className="col-lg-6">
        <h1 className="pb-3">{productName}</h1>
        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No Ratings Yet</div>
        )}

        <Card
          actions={[
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
            <a onClick={handleAddToWishlist}>
              <HeartOutlined className="text-danger" /> <br /> Add to Wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="red"
              />
            </RatingModal>,
          ]}
        >
          <ProductItems product={product} />
          <p></p>
        </Card>
      </div>
      <div className="container-fluid pt-3 pl-5 pr-5 pb-3">
        <div className="row">
          <div className="col-lg-12">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Description" key="1">
                {description}
              </TabPane>
              <TabPane tab="More" key="2">
                Call us on 1800 xxx 219 to know more about this Product.
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
