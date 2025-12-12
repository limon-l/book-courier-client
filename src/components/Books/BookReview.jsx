import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Star, User, Send, MessageSquareQuote, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const BookReview = ({ bookId, bookTitle }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", bookId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${bookId}`);
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    if (!user) {
      return toast.error("Please login to write a review");
    }

    setIsSubmitting(true);

    const reviewData = {
      bookId,
      bookTitle,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      rating: rating,
      comment: data.comment,
      date: new Date(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        toast.success("Review added successfully");
        reset();
        setRating(5);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-16">
      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-10 flex items-center gap-3">
        Reader Reviews
        <span className="flex items-center justify-center w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 text-sm font-bold rounded-full">
          {reviews.length}
        </span>
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        <div className="lg:col-span-5 h-fit lg:sticky lg:top-24 order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
            <h4 className="font-bold text-xl text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <MessageSquareQuote className="text-emerald-500" /> Write a Review
            </h4>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
                  Rate this book
                </label>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                      <label
                        key={index}
                        className="cursor-pointer group relative">
                        <input
                          type="radio"
                          name="rating"
                          className="hidden"
                          value={ratingValue}
                          onClick={() => setRating(ratingValue)}
                        />
                        <Star
                          size={32}
                          className={`transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 ${
                            ratingValue <= (hover || rating)
                              ? "fill-amber-400 text-amber-400 drop-shadow-sm"
                              : "text-slate-300 dark:text-slate-600"
                          }`}
                          onMouseEnter={() => setHover(ratingValue)}
                          onMouseLeave={() => setHover(null)}
                        />
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Your Experience
                </label>
                <textarea
                  {...register("comment", { required: true })}
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all min-h-[150px] dark:text-white resize-none"
                  placeholder="What did you like or dislike about this book?"></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-500/20 flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <Send size={18} /> Submit Review
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        <div className="lg:col-span-7 order-2 lg:order-1">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-emerald-500" size={40} />
            </div>
          ) : reviews.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
              <p className="text-slate-500 font-medium">No reviews yet.</p>
              <p className="text-sm text-slate-400">
                Be the first to share your thoughts!
              </p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-6">
              <AnimatePresence mode="popLayout">
                {reviews.map((review) => (
                  <motion.div
                    key={review._id}
                    variants={itemVariants}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                      <div className="flex items-center gap-4">
                        {review.userImage ? (
                          <img
                            src={review.userImage}
                            alt={review.userName}
                            className="w-12 h-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold border-2 border-emerald-200 dark:border-emerald-800 flex-shrink-0">
                            <User size={24} />
                          </div>
                        )}
                        <div>
                          <h5 className="font-bold text-slate-900 dark:text-white text-base">
                            {review.userName}
                          </h5>
                          <p className="text-xs text-slate-500 font-medium">
                            {new Date(review.date).toLocaleDateString(
                              undefined,
                              { year: "numeric", month: "long", day: "numeric" }
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/10 px-3 py-1 rounded-full border border-amber-100 dark:border-amber-900/20 self-start">
                        <Star
                          size={14}
                          className="fill-amber-400 text-amber-400"
                        />
                        <span className="text-sm font-bold text-amber-700 dark:text-amber-500">
                          {review.rating}.0
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 pl-0 sm:pl-[4rem]">
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm md:text-base break-words">
                        {review.comment}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookReview;
