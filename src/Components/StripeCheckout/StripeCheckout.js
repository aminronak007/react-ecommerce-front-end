import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import stripeImage from "../../assets/Images/stripe1.png";
import { createOrder, emptyUserCart } from "../../functions/user";
import { useHistory } from "react-router";

const StripeCheckout = ({}) => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  let history = useHistory();

  useEffect(() => {
    createPaymentIntent(user, coupon).then((res) => {
      // console.log("Payment Intent", res.data);
      setClientSecret(res.data.clientSecret);

      // Additional Information
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });
    if (payload.error) {
      setError(`Payment Failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      createOrder(user, payload).then((res) => {
        // console.log("create Order", res);
        if (res.data.ok) {
          if (typeof window !== "undefined") localStorage.removeItem("cart");

          // Empty Cart if ordered successful
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });

          // Reset Coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: [],
          });

          // Empty Cart from Database
          emptyUserCart(user);
          setTimeout(() => {
            history.push("/user/history");
          }, 5000);
        }
      });
      // console.log("payment Intent", JSON.stringify(payload, null, 4));
      setSucceeded(true);
      setError(null);
      setProcessing(false);
    }
  };

  const handleChange = async (e) => {
    setDisabled(e.empty); // disable pay button if erros
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total After Discount: ₹ ${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No Coupon Applied </p>
          )}
        </div>
      )}

      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={stripeImage}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <i class="fas fa-rupee-sign"></i>
              <br />
              Total: <i class="fas fa-rupee-sign "></i> {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" />
              <br />
              Total Payable: <i class="fas fa-rupee-sign"></i>&nbsp;
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div>

      <form className="stripe-form" onSubmit={handleSubmit} id="payment-form">
        <CardElement
          id="card-element"
          options={cartStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner" id="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <br />
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.
          <Link to="/user/history"> See it in your purchase history</Link>
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
