import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { X } from "lucide-react";

const OrderModal = ({ book, user, isOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();

  const onSubmit = (data) => {
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

    axiosSecure
      .post("/orders", orderData)
      .then((res) => {
        if (res.data.insertedId) {
          closeModal();
          Swal.fire({
            title: "Order Placed!",
            text: "Please go to My Orders to complete payment.",
            icon: "success",
          });
        }
      })
      .catch((error) => {
        closeModal();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-slate-900 p-6 text-left align-middle shadow-xl transition-all border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-6">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-slate-900 dark:text-white">
                    Confirm Order
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="text-slate-400 hover:text-red-500 transition">
                    <X size={24} />
                  </button>
                </div>

                <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl flex gap-4 items-center">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-16 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {book.title}
                    </h4>
                    <p className="text-emerald-600 font-bold">${book.price}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Name
                      </label>
                      <input
                        value={user?.displayName}
                        readOnly
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 border-none outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                        Email
                      </label>
                      <input
                        value={user?.email}
                        readOnly
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 border-none outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Phone Number
                    </label>
                    <input
                      {...register("phone", { required: true })}
                      type="tel"
                      placeholder="+880..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Delivery Address
                    </label>
                    <textarea
                      {...register("address", { required: true })}
                      rows="3"
                      placeholder="Full address..."
                      className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex justify-center rounded-xl border border-transparent bg-emerald-600 px-4 py-4 text-sm font-bold text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 transition shadow-lg shadow-emerald-500/20">
                      Place Order
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OrderModal;
