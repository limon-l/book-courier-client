import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { FileText } from "lucide-react";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <SectionTitle heading="Payment History" subHeading="Invoices" />
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment._id}
            className="flex flex-col md:flex-row justify-between items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg dark:bg-emerald-900/20">
                <FileText size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">
                  Transaction ID:{" "}
                  <span className="font-mono text-sm text-slate-500">
                    {payment.transactionId}
                  </span>
                </p>
                <p className="text-sm text-slate-500">
                  Paid on {new Date(payment.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 text-right w-full md:w-auto">
              <span className="block font-bold text-xl text-emerald-600">
                ${payment.price}
              </span>
              <span className="text-xs text-slate-400">
                For: {payment.bookTitle || "Book Purchase"}
              </span>
            </div>
          </div>
        ))}
        {payments.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No payment history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoices;
