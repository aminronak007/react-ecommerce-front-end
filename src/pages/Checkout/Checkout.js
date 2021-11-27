import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  getUserAddress,
  createCODOrder,
} from "../../functions/user";
import { applyCoupon } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import { frontUrl } from "../../config";

const Checkout = () => {
  const history = useHistory();
  const token = Cookies.get("accessToken");
  const authorization = `Bearer ${token}`;
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState({
    name: "",
    mobile: 0,
    pincode: 0,
    area: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    altPhn: 0,
  });
  const [userAddress, setUserAddress] = useState({});
  const [updateAddress, setUpdateAddress] = useState(false);
  const [hideUpdateBtn, setHideUpdateBtn] = useState(false);
  const [coupon1, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user, COD, coupon } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });

    loadAddress();
    showAddress();
  }, [userAddress]);

  const loadAddress = () => {
    getUserAddress(user).then((res) => {
      setUserAddress(res.data.address);
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;

    setAddress({
      ...address,
      [name]: value,
    });
  };

  const saveAddressToDb = () => {
    saveUserAddress(user, address).then((res) => {
      if (res.data.ok) {
        toast.success("Address Saved Successfully");
      } else {
        toast.error("Address not saved. Please input proper details");
      }
    });
    history.push("/checkout");
    setUpdateAddress(false);
    setHideUpdateBtn(false);
    loadAddress();
  };

  const handleEmptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    emptyUserCart(user).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      if (res.data) {
        toast.success("Cart is Empty. Continue Shopping");
        history.push("/");
      }
    });
  };

  const handleUpdateAddress = () => {
    setUpdateAddress(true);
    setHideUpdateBtn(true);
  };

  const showAddress = () => (
    <>
      <h4>Delivery Address</h4>
      <div className="row">
        <div className="col-12">
          {userAddress ? (
            <>
              <p>
                <strong>Name:</strong> {userAddress ? userAddress.name : null}
                <br />
                <strong>Mobile:</strong>{" "}
                {userAddress ? userAddress.mobile : null}
                <br />
                <strong>City:</strong> {userAddress ? userAddress.city : null}
                <br />
                <strong>State:</strong> {userAddress ? userAddress.state : null}
                <br />
                <strong>Address:</strong>
                {userAddress ? userAddress.address : null}
              </p>
              {hideUpdateBtn === false ? (
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleUpdateAddress}
                >
                  Update Address
                </button>
              ) : null}
            </>
          ) : (
            <>
              <p className="text-danger">
                Please Add Your Address before Placing Order...
              </p>
            </>
          )}

          {updateAddress === true ? (
            <>
              <h4> Update your Delivery Address</h4>

              <div className="row">
                <div className="col-md-6">
                  <input
                    name="name"
                    type="text"
                    onChange={(e) => handleAddressChange(e)}
                    className="form-control"
                    placeholder="Name"
                  />
                  <br />
                  <input
                    name="pincode"
                    type="number"
                    onChange={(e) => handleAddressChange(e)}
                    className="form-control"
                    placeholder="Pincode"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    name="mobile"
                    type="number"
                    onChange={(e) => handleAddressChange(e)}
                    className="form-control"
                    placeholder="10 Digit Mobile Number"
                  />
                  <br />
                  <input
                    name="area"
                    type="text"
                    onChange={(e) => handleAddressChange(e)}
                    className="form-control"
                    placeholder="Locality"
                  />
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12">
                  <textarea
                    name="address"
                    onChange={(e) => handleAddressChange(e)}
                    className="form-control"
                    placeholder="Address (Area and Street)"
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-6">
                  <input
                    name="city"
                    onChange={(e) => handleAddressChange(e)}
                    type="text"
                    className="form-control"
                    placeholder="City/District/Town"
                  />
                  <br />
                  <input
                    name="landmark"
                    onChange={(e) => handleAddressChange(e)}
                    type="text"
                    className="form-control"
                    placeholder="Landmark (Optional)"
                  />
                </div>

                <div className="col-md-6">
                  <input
                    name="state"
                    type="text"
                    onChange={(e) => handleAddressChange(e)}
                    className="form-control"
                    placeholder="State"
                  />
                  <br />
                  <input
                    name="altPhn"
                    onChange={(e) => handleAddressChange(e)}
                    type="number"
                    className="form-control"
                    placeholder="Alternate Phone (Optional)"
                  />
                </div>
              </div>
              <button
                className="btn btn-primary mt-2"
                onClick={saveAddressToDb}
              >
                Save
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );

  const showProductSummary = () => {
    return products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.productName} ({p.color}) x {p.count} =
          {p.product.price * p.count}
        </p>
      </div>
    ));
  };

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon1}
        type="text"
        className="form-control"
      />
      {discountError && <p className="text-danger">{discountError}</p>}
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );

  const applyDiscountCoupon = () => {
    applyCoupon(user, coupon1).then((res) => {
      // console.log(res);
      if (res.data.totalAfterDiscount) {
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const createCashOrder = () => {
    createCODOrder(user, COD, coupon).then((res) => {
      // Empty Cart from Redux, Local Storage, Reset Coupon, Reset COD, Redirect
      if (res.data.ok) {
        // Empty Local Storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");

        // Empty Redux Cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });

        // Empty Redux Coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });

        // Empty Redux CODE
        dispatch({
          type: "COD",
          payload: false,
        });

        //Empty Cart from Backend
        emptyUserCart(user);
        setTimeout(() => {
          window.location.href = `${frontUrl}/user/history`;
        }, 2000);
      }
    });
  };

  return (
    <div className="row px-5 py-5">
      <div className="col-md-6">
        {showAddress()}
        <hr />
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <strong>Products {products.length}</strong>
        <hr />
        {showProductSummary()}
        <hr />
        <p>
          <strong>Cart Total:</strong> {total}
        </p>
        <h4 className="text-primary">Got Coupon ?</h4>
        <hr />
        {showApplyCoupon()}
        <br />
        {totalAfterDiscount > 0 && (
          <p>
            <span className="text-success">Discount Applied...</span>
            <br />
            <strong>Total Payable:</strong>&nbsp;
            {totalAfterDiscount}
          </p>
        )}
        <div className="row">
          <div className="col-md-12">
            {COD && COD === true ? (
              <button
                className="btn btn-primary"
                disabled={!userAddress || !products.length ? true : false}
                onClick={createCashOrder}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                disabled={!userAddress || !products.length ? true : false}
                onClick={() => history.push("/payment")}
              >
                Place Order
              </button>
            )}
            &nbsp;
            <button
              disabled={!products.length}
              onClick={handleEmptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
