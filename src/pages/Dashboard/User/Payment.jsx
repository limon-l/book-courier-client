import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading";

const stripeKey = import.meta.env.VITE_Payment_Gateway_PK;
const stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const Payment = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["order-payment", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!stripePromise) {
    return (
      <div className="text-center text-red-500 py-20 font-bold">
        Error: Stripe Publishable Key is missing in configuration.
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="text-center text-red-500 py-20 font-bold">
        Error: Order information not found.
      </div>
    );
  }

  return (
    <div>
      <SectionTitle heading="Payment" subHeading="Please pay to confirm" />
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
        <div className="mb-8 text-center">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {order.bookTitle}
          </h3>
          <p className="text-slate-500">
            Amount to pay:{" "}
            <span className="text-emerald-600 font-bold text-lg">
              ${order.price}
            </span>
          </p>
        </div>
        <Elements stripe={stripePromise}>
          <CheckoutForm order={order} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
