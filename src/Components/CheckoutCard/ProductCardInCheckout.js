import React from "react";
import ModalImage from "react-modal-image";
import defaultImage from "../../assets/Images/defaultImage.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Gold", "Silver", "White", "Blue"];
  let dispatch = useDispatch();

  const handleColorChange = (e) => {
    // console.log(e.target.value);

    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].color = e.target.value;
        }
      });
      //   console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleQtyChange = (e) => {
    let count = e.target.value < 1 ? 1 : e.target.value;
    if (count > p.quantity) {
      toast.error(`Max Quantity Available is:${p.quantity}`);
      return;
    }
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart[i].count = count;
        }
      });
      //   console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((product, i) => {
        if (product._id === p._id) {
          cart.splice(i, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={defaultImage} large={defaultImage} />
            )}
          </div>
        </td>
        <td>{p.productName}</td>
        <td>Rs. {p.price}</td>
        <td>{p.brand}</td>
        <td>
          <select
            name="color"
            onChange={handleColorChange}
            className="form-control"
            id=""
          >
            {p.color ? (
              <option value={p.color}>{p.color}</option>
            ) : (
              <option>Select</option>
            )}
            {colors
              .filter((i) => i !== p.color)
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </select>
        </td>
        <td className="text-center">
          <input
            className="form-control"
            type="number"
            value={p.count}
            onChange={handleQtyChange}
          />
        </td>
        <td className="text-center">
          {p.shipping === "Yes" ? (
            <CheckCircleOutlined className="text-success" />
          ) : (
            <CloseCircleOutlined className="text-danger" />
          )}
        </td>
        <td className="text-center">
          <DeleteFilled
            className="text-danger pointer"
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
