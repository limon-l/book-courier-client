import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const MyWishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: wishlist = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
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
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/wishlist/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({ title: "Removed!", icon: "success" });
            refetch();
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
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
    );
  }

  return (
    <div>
      <SectionTitle heading="My Wishlist" subHeading="Books you love" />
      {wishlist.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          No wishlist items found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item, i) => (
            <div
              key={item._id}
              className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex gap-4 shadow-sm hover:shadow-lg transition transform hover:-translate-y-1 motion-reduce:transform-none opacity-0 animate-slideUp"
              style={{
                animationDelay: `${i * 0.05}s`,
                animationFillMode: "forwards",
              }}>
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-32 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-2">{item.author}</p>
                  <p className="text-emerald-600 font-bold">${item.price}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <Link
                    to={`/books/${item.bookId}`}
                    className="text-sm font-medium text-emerald-600 hover:underline">
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
