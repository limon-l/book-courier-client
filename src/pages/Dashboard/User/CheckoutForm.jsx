import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const CheckoutForm = ({ order }) => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
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
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => {
          console.error("Payment Intent Error:", err);
          setError("Failed to initialize payment. Please try again.");
        });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setProcessing(true);

    const { error: pmError } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user?.email || "anonymous",
        name: user?.displayName || "anonymous",
      },
    });

    if (pmError) {
      setError(pmError.message);
      setProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      const payment = {
        email: user.email,
        price,
        transactionId: paymentIntent.id,
        date: new Date(),
        orderId: order._id,
        bookId: order.bookId,
        bookTitle: order.bookTitle,
      };

      const res = await axiosSecure.post("/payments", payment);
      if (res.data?.paymentResult?.insertedId) {
        Swal.fire({
          title: "Payment Successful!",
          text: `Transaction ID: ${paymentIntent.id}`,
          icon: "success",
          confirmButtonColor: "#10B981",
        });
        navigate("/dashboard/invoices");
      }
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
          Card Details
        </label>
        <div className="p-4 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-800 focus-within:ring-2 focus-within:ring-emerald-500 transition-all">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#1e293b",
                  "::placeholder": { color: "#94a3b8" },
                },
                invalid: { color: "#ef4444" },
              },
            }}
          />
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
          {error}
        </div>
      )}

      <button
        className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 p-px disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={!stripe || !clientSecret || processing}>
        <span className="relative flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-transparent rounded-xl text-white font-bold text-lg transition-all group-hover:bg-opacity-0">
          {processing ? (
            "Processing..."
          ) : (
            <>
              <Lock size={18} /> Pay ${price}
            </>
          )}
        </span>
      </button>

      <div className="flex justify-center items-center gap-2 text-slate-400 text-xs mt-4">
        <Lock size={12} />
        <span>Payments are secure and encrypted</span>
      </div>
    </form>
  );
};

export default CheckoutForm;
