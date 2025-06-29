import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/UseAuth/useAxiosSecure";
import UseAuth from "../../../../hooks/UseAuth/UseAuth";
import Swal from "sweetalert2";

// 21.8.1 created a payment form component
const PaymentForm = () => {
  // 21.11 import as per doc following two
  const stripe = useStripe();
  const elements = useElements();

  const { user } = UseAuth();

  const navigate = useNavigate();
  // 21.15 our requirement is pay the specific parcel according to id
  //   21.15.1 we need the id of specific parcel to send the payment to the server
  const { parcelId } = useParams();
  console.log("Parcel Id", parcelId);

  // 21.14 show error for invalid card
  const [error, setError] = useState("");

  //   21.16 import axios hook
  const axiosSecure = useAxiosSecure();

  //   21.16.1 get the parcel id using tansstack query
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) {
    return "...Loading";
  }

  console.log("Parcel info", parcelInfo);

  // 21.16.2 now show the amount in a pay button and convert to cent
  const amount = parcelInfo.totalCost;
  const amountInCents = amount * 100;

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

      // 21.17.5 creating payment intent in frontend and after that fill the form from ui and ui will get in console "res from intent data"
      const res = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
        parcelId,
      });
      console.log("res from intent", res);

      // 21.17.6 implement payment confirmation with error
      // Confirm card payment
      const clientSecret = res.data.clientSecret; //this client secret is found from res.data
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName, // You can collect this information from the user
            email: user.email,
          },
        },
      });
      if (result.error) {
        // Show error to your customer

        setError(result.error.message);
        //   setSucceeded(false);
      } else {
        setError("");
        if (result.paymentIntent.status === "succeeded") {
          // The payment has been processed!
          // setError(null);
          // setSucceeded(true);
          console.log("Payment succeeded:", result.paymentIntent);
          console.log(result);
          // 21.17.7 now from this step fill up the card and pay u will see in console payment succeeded and also "res from intent"'s data. now go to https://dashboard.stripe.com/test/payments u will get your parcel payment "succeeded".

          // 21.17.10 send the data to the server using axios so first created paymentData object
          const transactionId = result.paymentIntent.id;
          const paymentData = {
            parcelId,
            email: user.email,
            amount,
            transactionId: transactionId, //during onclick to pay button in console result.paymentIntent object is created and took the id form there and set it to transactionId
            paymentMethod: result.paymentIntent.payment_method_types, //same as transactionId, took the payment_method_types
          };

          // 21.17.11 send the paymentData using axios
          const paymentRes = await axiosSecure.post("/payments", paymentData);
          if (paymentRes.data.insertedId) {
            console.log("Successfully Paid for the parcel");
            Swal.fire({
              title: "✅ Payment Successful!",
              html: `Your transaction ID is:<br><strong>${transactionId}</strong>`,
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/dashboard/myParcel");
          }
        }
      }
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
        {/* 21.16.3 show amount */}
        Pay ${amount} Tk
      </button>
      {/* 21.14.3  now type in the form to test 4242 4242 4242 4242 and rest of the data is as ur wish*/}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
