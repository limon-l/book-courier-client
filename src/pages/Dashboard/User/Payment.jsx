import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading";
import { ArrowLeft, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";

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
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Error: Stripe Configuration Missing
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Error: Order information not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          to="/dashboard/my-orders"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 font-medium transition">
          <ArrowLeft size={20} /> Cancel Payment
        </Link>

        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-700">
          <div className="md:w-5/12 bg-slate-100 dark:bg-slate-900 p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

            <div className="relative z-10">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
                Order Summary
              </h3>
              <div className="aspect-[2/3] w-32 rounded-lg shadow-lg overflow-hidden mb-6 border-4 border-white dark:border-slate-700">
                <img
                  src={order.bookImage}
                  alt={order.bookTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">
                {order.bookTitle}
              </h2>
              <p className="text-emerald-600 font-bold text-3xl mt-2">
                ${order.price}
              </p>
            </div>

            <div className="relative z-10 mt-8 space-y-3">
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <Truck size={18} className="text-emerald-500" />
                <span>Express Delivery Included</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-sm">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>Purchase Protection</span>
              </div>
            </div>
          </div>

          <div className="md:w-7/12 p-8 md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Payment Details
              </h2>
              <p className="text-slate-500 mt-1">
                Complete your purchase securely.
              </p>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm order={order} />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
