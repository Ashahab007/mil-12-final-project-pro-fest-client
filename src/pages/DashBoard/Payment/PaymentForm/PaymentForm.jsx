import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React from "react";

// 21.8 created a payment form component
const PaymentForm = () => {
  // 21.11 import as per doc following two
  const stripe = useStripe();
  const elements = useElements();

  // 21.10 created handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // 21.12 as per doc following three condition is created
    if (!stripe || !elements) {
      return;
    }
    // 21.12.1
    const card = document.getElement(CardElement);
    // 21.12.2
    if (!card) {
      return;
    }
  };
  // 21.9 created the form and import CardElement from @stripe/react-stripe-js and implement button as per doc
  return (
    <form onSubmit={handleSubmit}>
      <CardElement>
        {/* 20.11.1 disabled if stripe is not present */}
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </CardElement>
    </form>
  );
};

export default PaymentForm;
