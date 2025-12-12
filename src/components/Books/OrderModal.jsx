import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { X, Loader2, MapPin, Phone, User, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OrderModal = ({ book, user, isOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      bookImage: book.image,
      price: book.price,
      librarianEmail: book.librarianEmail,
      userEmail: user.email,
      userName: user.displayName,
      phone: data.phone,
      address: data.address,
      date: new Date(),
      status: "pending",
      paymentStatus: "unpaid",
    };

    try {
      const res = await axiosSecure.post("/orders", orderData);
      if (res.data.insertedId) {
        closeModal();
        Swal.fire({
          title: "Order Placed!",
          text: "Please go to My Orders to complete payment.",
          icon: "success",
          confirmButtonColor: "#10B981",
        });
      }
    } catch (error) {
      closeModal();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Confirm Order
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
                  <X size={20} />
                </button>
              </div>

              <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex gap-5 items-center border border-slate-100 dark:border-slate-700">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-16 h-24 object-cover rounded-lg shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg line-clamp-1">
                    {book.title}
                  </h4>
                  <p className="text-emerald-600 font-bold text-xl mt-1">
                    ${book.price}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                      <input
                        value={user?.displayName}
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 border-none outline-none font-medium text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Email
                    </label>
                    <div className="relative">
                      <Mail
                        size={16}
                        className="absolute left-3 top-3 text-slate-400"
                      />
                      <input
                        value={user?.email}
                        readOnly
                        className="w-full pl-9 pr-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 border-none outline-none font-medium text-sm truncate cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone
                      size={16}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />
                    <input
                      {...register("phone", { required: true })}
                      type="tel"
                      placeholder="+880..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin
                      size={16}
                      className="absolute left-3 top-3.5 text-slate-400"
                    />
                    <textarea
                      {...register("address", { required: true })}
                      rows="3"
                      placeholder="Street, City, Zip Code..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none transition-all dark:text-white"></textarea>
                  </div>
                </div>

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 text-base font-bold text-white hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      "Place Order"
                    )}
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
