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

  const { data: wishlist = [], refetch } = useQuery({
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

  return (
    <div>
      <SectionTitle heading="My Wishlist" subHeading="Books you love" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 flex gap-4 shadow-sm hover:shadow-md transition">
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
    </div>
  );
};

export default MyWishlist;
