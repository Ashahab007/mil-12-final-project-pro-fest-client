import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

// 21.8 created a payment form component
const PaymentForm = () => {
  // 21.11 import as per doc following two
  const stripe = useStripe();
  const elements = useElements();

  // 21.14 show error for invalid card
  const [error, setError] = useState("");

  // 21.10 created handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 21.12 as per doc following three condition is created
    if (!stripe || !elements) {
      return;
    }
    // 21.12.1
    const card = elements.getElement(CardElement);
    // 21.12.2
    if (!card) {
      return;
    }

    // 21.13 now creating the card payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      //   21.14.1
      setError(error.message);
    } else {
      console.log("Payment Method", paymentMethod);
      //   21.14.2
      setError("");
    }
  };

  // 21.9 created the form and import CardElement from @stripe/react-stripe-js and implement button as per doc
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white rounded-xl p-6 shadow-md w-full max-w-md mx-auto"
    >
      <CardElement className="p-2 border rounded">
        {/* 21.11.1 disabled if stripe is not present */}
      </CardElement>
      <button
        className="btn btn-primary w-full"
        type="submit"
        disabled={!stripe}
      >
        Pay
      </button>
      {/* 21.14.3  now type in the form to test 4242 4242 4242 4242 and rest of the data is as ur wish*/}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
