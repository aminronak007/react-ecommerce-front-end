import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { STRIPE_KEY } from "../../config";
import StripeCheckout from "../../Components/StripeCheckout/StripeCheckout";
import "../../stripe.css";

const promise = loadStripe(STRIPE_KEY);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h3>
        <strong>Complete your Purchase</strong>
      </h3>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
