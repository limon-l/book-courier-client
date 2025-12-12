import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["librarian-orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/librarian/${user.email}`);
      return res.data;
    },
  });

  const handleStatusChange = (id, newStatus) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to change the status to ${newStatus}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/orders/status/${id}`, { status: newStatus })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Updated!",
                text: `Order marked as ${newStatus}`,
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          });
      }
    });
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <SectionTitle
        heading="Manage Orders"
        subHeading="Process customer requests"
      />

      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        {isLoading ? (
          <div className="w-full flex justify-center items-center py-16">
            <Loader2 size={36} className="animate-spin text-emerald-600" />
          </div>
        ) : (
          <table className="table w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="py-4 pl-6 text-left">Book</th>
                <th className="py-4 text-left">Customer</th>
                <th className="py-4 text-left">Current Status</th>
                <th className="py-4 pr-6 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="text-slate-700 dark:text-slate-300">
              <AnimatePresence>
                {orders.map((order) => (
                  <motion.tr
                    key={order._id}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.25 }}
                    className="border-b border-slate-100 dark:border-slate-800 last:border-none hover:bg-emerald-50/40 dark:hover:bg-slate-800/50 transition">
                    <td className="py-4 pl-6 font-medium">{order.bookTitle}</td>

                    <td className="py-4">
                      <div className="text-sm">{order.userEmail}</div>
                    </td>

                    <td className="py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                          order.status === "delivered"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {order.status}
                      </span>
                    </td>

                    <td className="py-4 pr-6 text-right">
                      <motion.select
                        whileTap={{ scale: 0.97 }}
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order._id, e.target.value)
                        }
                        className="select select-sm text-xs border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-slate-800 cursor-pointer">
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </motion.select>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
