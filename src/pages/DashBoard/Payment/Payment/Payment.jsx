import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "../PaymentForm/PaymentForm";

// 21.0 My requirement is implement payment method using stripe js. from "https://github.com/stripe/react-stripe-js" and run "npm install @stripe/react-stripe-js @stripe/stripe-js" in client side.

// 21.1 create a Payment component

// 21.7 as per doc copy the following promise here the given key is for testing purpose. but we will change it later
// 21.17.2 use the key "pk_test_51ResXyPDXAjOVcw8Q6Hj137Rat1oXqkWmnDZxnPpCNhD1DO2vG3CrG2v1X3t5d39CaaBn86fm6b7Cp5dXeETIFir009XG1bFCo" or VITE_Payment_Key=pk_test_51ResXyPDXAjOVcw8Q6Hj137Rat1oXqkWmnDZxnPpCNhD1DO2vG3CrG2v1X3t5d39CaaBn86fm6b7Cp5dXeETIFir009XG1bFCo
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key);

const Payment = () => {
  return (
    // 21.8 import the Elements and send stripePromise as per doc. then created the <PaymentForm> and set in the middle
    <Elements stripe={stripePromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
};

export default Payment;
