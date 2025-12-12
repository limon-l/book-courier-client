import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import { Trash2, Heart } from "lucide-react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../../components/Shared/Loading";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlist = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#10B981",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/wishlist/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Removed!",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <SectionTitle heading="My Wishlist" subHeading="Books you love" />

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
            <Heart size={48} className="text-slate-300 dark:text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">
            Your wishlist is empty
          </h3>
          <Link
            to="/books"
            className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
            Explore Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {wishlist.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 flex gap-4 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-24 h-36 flex-shrink-0 rounded-xl overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2 leading-tight mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mb-2">
                      by {item.author}
                    </p>
                    <p className="text-emerald-600 font-bold text-lg">
                      ${item.price}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Link
                      to={`/books/${item.bookId}`}
                      className="text-xs font-bold text-emerald-600 hover:underline uppercase tracking-wide">
                      View Details
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1, color: "#ef4444" }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(item._id)}
                      className="text-slate-400 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <Trash2 size={18} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
