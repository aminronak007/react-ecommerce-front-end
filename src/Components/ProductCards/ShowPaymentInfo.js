import React from "react";

const ShowPaymentInfo = ({ order }) => (
  <div>
    <p>
      <span>Order Id: {order._id}</span>
      {" | "}
      {order.paymentIntent ? (
        <>
          <span>
            <b>Amount:</b>
            {(order.paymentIntent.amount /= 100).toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
            })}
          </span>
          {" | "}
          <span>
            <b>Currency: </b> {order.paymentIntent.currency.toUpperCase()}
          </span>
          {" | "}
          <span>
            <b>Method:</b> {order.paymentIntent.payment_method_types[0]}
          </span>
          {" | "}
          <span>
            <b>Payment:</b> {order.paymentIntent.status.toUpperCase()}
          </span>
          {" | "}
          <span>
            <b>Orderd on:</b>
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </span>
          {" | "}
        </>
      ) : null}

      <span
        className={
          order.orderStatus === "Completed"
            ? " badge bg-success text-white"
            : order.orderStatus === "Cancelled"
            ? " badge bg-danger text-white"
            : order.orderStatus === "Processing"
            ? " badge bg-warning text-black"
            : order.orderStatus === "Dispatched"
            ? " badge bg-info text-white"
            : order.orderStatus === "Cash On Delivery"
            ? " badge bg-secondary text-white"
            : "badge bg-primary text-white"
        }
      >
        <b>STATUS:</b> {order.orderStatus}
      </span>
    </p>
  </div>
);

export default ShowPaymentInfo;
