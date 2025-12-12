import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Package, XCircle, CreditCard, CheckCircle } from "lucide-react";
import Loading from "../../../components/Shared/Loading";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user.email}`);
      return res.data;
    },
  });

  const handleCancelOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#10B981",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire(
              "Cancelled!",
              "Your order has been cancelled.",
              "success"
            );
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <SectionTitle heading="My Orders" subHeading="Track your books" />

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <Package
            size={64}
            className="text-slate-300 dark:text-slate-700 mb-4"
          />
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">
            No orders yet
          </h3>
          <p className="text-slate-500">
            Go explore the library and borrow some books!
          </p>
          <Link
            to="/books"
            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Browse Books
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <table className="table w-full">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 uppercase text-xs font-bold tracking-wider">
              <tr>
                <th className="py-5 pl-6 text-left">Book Details</th>
                <th className="py-5 text-left">Order Date</th>
                <th className="py-5 text-left">Status</th>
                <th className="py-5 text-left">Amount</th>
                <th className="py-5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <AnimatePresence>
                {orders.map((order, index) => (
                  <motion.tr
                    key={order._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-16 rounded-md overflow-hidden bg-slate-200">
                          <img
                            src={order.bookImage}
                            alt={order.bookTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 dark:text-white">
                            {order.bookTitle}
                          </div>
                          {order.paymentStatus === "paid" && (
                            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-full mt-1 font-medium">
                              <CheckCircle size={10} /> Paid
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-600 dark:text-slate-400 text-sm">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold capitalize inline-flex items-center gap-1.5 ${
                          order.status === "delivered"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}>
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            order.status === "delivered"
                              ? "bg-emerald-500"
                              : order.status === "cancelled"
                              ? "bg-red-500"
                              : "bg-amber-500"
                          }`}></span>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 font-bold text-slate-900 dark:text-white">
                      ${order.price}
                    </td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {order.status === "pending" && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleCancelOrder(order._id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Cancel Order">
                            <XCircle size={20} />
                          </motion.button>
                        )}

                        {order.status === "pending" &&
                        order.paymentStatus !== "paid" ? (
                          <Link to={`/dashboard/payment/${order._id}`}>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 shadow-md shadow-emerald-500/20 transition-all">
                              <CreditCard size={16} /> Pay Now
                            </motion.button>
                          </Link>
                        ) : order.paymentStatus === "paid" ? (
                          <span className="text-emerald-500 font-bold text-sm">
                            Completed
                          </span>
                        ) : null}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
