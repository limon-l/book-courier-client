import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const OrderModal = ({ book, user, isOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        <Dialog
          static
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          open={isOpen}
          className="relative z-50"
          onClose={closeModal}>
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Dialog.Panel
                as={motion.div}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, type: "spring" }}
                className="w-full max-w-md transform overflow-hidden rounded-3xl bg-white dark:bg-slate-900 p-8 text-left align-middle shadow-2xl transition-all border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-8">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-slate-900 dark:text-white">
                    Confirm Order
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-full transition-all">
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
                      <input
                        value={user?.displayName}
                        readOnly
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 border-none outline-none font-medium text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                        Email
                      </label>
                      <input
                        value={user?.email}
                        readOnly
                        className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-600 dark:text-slate-400 border-none outline-none font-medium text-sm truncate"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Phone Number
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      type="tel"
                      placeholder="+880..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2 ml-1">
                      Delivery Address
                    </label>
                    <textarea
                      {...register("address", { required: true })}
                      rows="3"
                      placeholder="Street, City, Zip Code..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none transition-all dark:text-white"></textarea>
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
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
