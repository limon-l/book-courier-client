import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ order }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const price = order.price;

  useEffect(() => {
    if (price > 0.5) {
      axiosSecure
        .post("/create-payment-intent", { price })
        .then((res) => {
          console.log("Client Secret:", res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Payment Intent Error:", err);
          setError("Failed to initialize payment. Please try again.");
        });
    } else {
      setError("Invalid price amount. Cannot process payment.");
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    setProcessing(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.error("Payment Method Error:", error);
      setError(error.message);
      setProcessing(false);
      return;
    } else {
      setError("");
    }

    // Confirm Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.error("Confirm Error:", confirmError);
      setError(confirmError.message);
      setProcessing(false);
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log("Payment Succeeded:", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          email: user.email,
          price: price,
          transactionId: paymentIntent.id,
          date: new Date(),
          orderId: order._id,
          bookId: order.bookId,
          bookTitle: order.bookTitle,
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Successful",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/invoices");
        }
        setProcessing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl mb-6 bg-white dark:bg-slate-800">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>

      <button
        className="w-full btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl disabled:bg-slate-300 disabled:cursor-not-allowed transition"
        type="submit"
        disabled={!stripe || !clientSecret || processing}>
        {processing ? "Processing..." : `Pay $${price}`}
      </button>

      {error && (
        <p className="text-red-500 text-sm mt-4 font-medium bg-red-50 p-2 rounded">
          {error}
        </p>
      )}
      {transactionId && (
        <p className="text-emerald-600 text-sm mt-4 font-medium">
          Transaction ID: {transactionId}
        </p>
      )}
    </form>
  );
};

export default CheckoutForm;
