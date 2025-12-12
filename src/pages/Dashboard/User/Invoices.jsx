import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { FileText } from "lucide-react";

const Invoices = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="animate-fadeIn duration-500">
      <SectionTitle heading="Payment History" subHeading="Invoices" />

      {isLoading && (
        <div className="flex justify-center py-16">
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
        <div className="space-y-4">
          {payments.map((payment, i) => (
            <div
              key={payment._id}
              className="flex flex-col md:flex-row justify-between items-center p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition transform duration-300 hover:scale-[1.01] animate-slideUp opacity-0"
              style={{
                animationDelay: `${i * 0.08}s`,
                animationFillMode: "forwards",
              }}>
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
            <div className="text-center py-20 text-slate-500 animate-fadeInSlow">
              No payment history found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Invoices;
