import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", user?.email],
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Cancelled!",
              text: "Your order has been cancelled.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div className="animate-fadeIn duration-500">
      <SectionTitle heading="My Orders" subHeading="Track your books" />

      {isLoading && (
        <div className="flex justify-center py-20">
          <svg
            className="animate-spin h-10 w-10 text-emerald-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {!isLoading && (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 animate-slideUpSlow">
          <table className="table w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="py-4 pl-6 text-left">Book Title</th>
                <th className="py-4 text-left">Order Date</th>
                <th className="py-4 text-left">Status</th>
                <th className="py-4 text-left">Price</th>
                <th className="py-4 pr-6 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-slate-700 dark:text-slate-300">
              {orders.map((order, i) => (
                <tr
                  key={order._id}
                  className="border-b border-slate-100 dark:border-slate-800 last:border-none opacity-0 animate-slideUp"
                  style={{
                    animationDelay: `${i * 0.07}s`,
                    animationFillMode: "forwards",
                  }}>
                  <td className="py-4 pl-6 font-medium">
                    {order.bookTitle}
                    {order.paymentStatus === "paid" && (
                      <span className="block text-[10px] text-emerald-600 font-mono mt-1">
                        Paid
                      </span>
                    )}
                  </td>

                  <td className="py-4">
                    {new Date(order.date).toLocaleDateString()}
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        order.status === "delivered"
                          ? "bg-emerald-100 text-emerald-800"
                          : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                      {order.status}
                    </span>
                  </td>

                  <td className="py-4 font-bold text-slate-800 dark:text-slate-200">
                    ${order.price}
                  </td>

                  <td className="py-4 pr-6 text-right space-x-2">
                    {order.status === "pending" && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className="px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg text-sm font-medium transition">
                        Cancel
                      </button>
                    )}

                    {order.status === "pending" &&
                      order.paymentStatus !== "paid" && (
                        <Link
                          to={`/dashboard/payment/${order._id}`}
                          className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 transition">
                          Pay Now
                        </Link>
                      )}

                    {order.paymentStatus === "paid" && (
                      <span className="text-emerald-600 font-bold text-sm px-2">
                        Paid ✓
                      </span>
                    )}
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-16 text-slate-500 animate-fadeInSlow">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
