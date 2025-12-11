import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Shared/Loading";
import OrderModal from "../../components/Books/OrderModal";
import BookReview from "../../components/Books/BookReview";
import { Star, Heart, ArrowLeft, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: book,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
    retry: false,
  });

  const { data: wishlist = [], refetch: refetchWishlist } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const wishlistItem = wishlist.find((item) => item.bookId === id);
  const isInWishlist = !!wishlistItem;

  const handleWishlistToggle = async () => {
    if (!user) {
      return toast.error("Please login to manage wishlist");
    }
    if (!book) return;

    try {
      if (isInWishlist) {
        const res = await axiosSecure.delete(`/wishlist/${wishlistItem._id}`);
        if (res.data.deletedCount > 0) {
          toast.success("Removed from Wishlist", { icon: "❎" });
          refetchWishlist();
        }
      } else {
        const newWishlistItem = {
          bookId: book._id,
          email: user?.email,
          title: book.title,
          image: book.image,
          author: book.author,
          price: book.price,
        };
        const res = await axiosSecure.post("/wishlist", newWishlistItem);
        if (res.data.insertedId) {
          toast.success("Added to Wishlist", { icon: "✅" });
          refetchWishlist();
        }
      }
    } catch (err) {
      toast.error("Failed to update wishlist");
      console.error(err);
    }
  };

  if (isLoading) return <Loading />;

  if (isError || !book) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertTriangle size={64} className="text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
          Book Not Found
        </h2>
        <p className="text-slate-500 mb-6 max-w-md">
          The book you are looking for might have been removed or the link is
          invalid. (Error:{" "}
          {error?.response?.data?.message || error?.message || "Unknown ID"})
        </p>
        <Link
          to="/books"
          className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
          Back to Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12 px-4 max-w-6xl mx-auto min-h-screen">
      <Link
        to="/books"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-8 font-medium transition">
        <ArrowLeft size={20} /> Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="rounded-2xl overflow-hidden shadow-2xl mb-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={book.quantity === 0}
              className={`flex-1 py-4 rounded-xl font-bold text-lg shadow-lg transition transform hover:-translate-y-1 ${
                book.quantity > 0
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/30"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
              }`}>
              {book.quantity > 0 ? "Order Now" : "Out of Stock"}
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`p-4 border-2 rounded-xl transition ${
                isInWishlist
                  ? "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20"
                  : "border-slate-200 dark:border-slate-700 text-slate-400 hover:text-red-500 hover:border-red-500 bg-white dark:bg-slate-900"
              }`}>
              <Heart size={24} className={isInWishlist ? "fill-current" : ""} />
            </button>
          </div>
        </div>

        <div className="md:col-span-7 lg:col-span-8">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold">
                {book.category}
              </span>
              <span
                className={`px-4 py-1.5 rounded-full text-sm font-bold ${
                  book.quantity > 0
                    ? "bg-blue-100 text-blue-800"
                    : "bg-red-100 text-red-800"
                }`}>
                {book.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3">
              {book.title}
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-8">
              by {book.author}
            </p>

            <div className="flex items-end gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
              <span className="text-4xl font-bold text-emerald-600">
                ${book.price}
              </span>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(book.rating || 0)
                          ? "fill-current"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-400 text-sm font-medium">
                  ({book.rating || 0} Rating)
                </span>
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-12">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Description
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                {book.description || "No description available for this book."}
              </p>
            </div>
          </div>
        </div>
      </div>

      <BookReview bookId={id} bookTitle={book.title} />

      {isModalOpen && (
        <OrderModal
          book={book}
          user={user}
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default BookDetails;
