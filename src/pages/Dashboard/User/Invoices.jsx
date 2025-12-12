import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { FileText, Calendar, CreditCard } from "lucide-react";
import Loading from "../../../components/Shared/Loading";
import { motion } from "framer-motion";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <SectionTitle heading="Payment History" subHeading="Your Invoices" />

      {payments.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
          <CreditCard
            size={48}
            className="mx-auto text-slate-300 dark:text-slate-600 mb-4"
          />
          <p className="text-slate-500">No payment history found.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {payments.map((payment, index) => (
            <motion.div
              key={payment._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col md:flex-row justify-between items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center gap-5 w-full md:w-auto mb-4 md:mb-0">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl dark:bg-emerald-900/20 group-hover:scale-110 transition-transform duration-300">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-lg">
                    {payment.bookTitle || "Book Purchase"}
                  </p>
                  <p className="font-mono text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <span className="opacity-70">ID:</span>{" "}
                    {payment.transactionId}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto md:gap-12 border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                <div className="text-sm text-slate-500 flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(payment.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="text-right">
                  <span className="block font-bold text-2xl text-emerald-600">
                    ${payment.price}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Paid
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Invoices;
