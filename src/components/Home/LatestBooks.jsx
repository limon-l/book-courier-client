import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, ArrowRight, Loader2 } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const LatestBooks = () => {
  const axiosPublic = useAxiosPublic();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["latestBooks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/books");
      return res.data.slice(0, 4);
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-32 w-full">
        <Loader2 className="animate-spin text-emerald-600" size={48} />
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } },
  };

  return (
    <section className="py-24 px-4 max-w-7xl mx-auto bg-white dark:bg-slate-900 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center mb-16 text-center">
        <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-3">
          New Arrivals
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
          Latest Books
        </h2>
        <div className="w-24 h-1.5 bg-emerald-500 rounded-full"></div>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <motion.div
            key={book._id}
            variants={item}
            whileHover={{ y: -10 }}
            className="group bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
            <div className="h-[320px] overflow-hidden relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                <Link to={`/books/${book._id}`}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-emerald-600 px-8 py-3 rounded-full font-bold shadow-lg">
                    View Details
                  </motion.button>
                </Link>
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                  {book.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-slate-500 text-sm mb-4 font-medium">
                by {book.author}
              </p>

              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(book.rating || 0)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }
                  />
                ))}
              </div>

              <div className="mt-auto flex justify-between items-center pt-5 border-t border-slate-100 dark:border-slate-700">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${book.price}
                </span>
                <Link
                  to={`/books/${book._id}`}
                  className="p-3 bg-slate-50 dark:bg-slate-700 text-slate-400 hover:text-white hover:bg-emerald-500 rounded-full transition-all duration-300">
                  <ShoppingBag size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-16">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors text-lg group/link">
          View All Collection
          <ArrowRight
            size={20}
            className="transition-transform group-hover/link:translate-x-1"
          />
        </Link>
      </motion.div>
    </section>
  );
};

export default LatestBooks;
