import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import defaultImage from "../../assets/Images/defaultImage.png";

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { cart, drawer } = useSelector((state) => ({ ...state }));

  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  };
  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      placement="right"
      visible={drawer}
      onClose={() => {
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        });
      }}
      closable={true}
    >
      {cart.map((p) => {
        return (
          <div className="row" key={p._id}>
            <div className="col">
              {p.images[0] ? (
                <>
                  <img
                    src={p.images[0].url}
                    alt="productImage"
                    style={imageStyle}
                  />
                  <p className="text-center bg-secondary text-light">
                    {p.productName} x {p.count}
                  </p>
                </>
              ) : (
                <>
                  <img
                    src={defaultImage}
                    alt="productImage"
                    style={imageStyle}
                  />
                  <p className="text-center bg-secondary text-light">
                    {p.productName} x {p.count}
                  </p>
                </>
              )}
            </div>
          </div>
        );
      })}
      <Link to="/cart">
        <button
          onClick={() => {
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            });
          }}
          className="text-center btn btn-primary btn-raised btn-block"
        >
          Go To Cart
        </button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
