import { Link } from "react-router-dom";
import { Star, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const BookCard = ({ book }) => {
  const { _id, title, author, image, price, category, rating, quantity } = book;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
      <div className="h-[280px] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />

        {quantity === 0 && (
          <div className="absolute inset-0 bg-white/60 dark:bg-black/60 flex items-center justify-center backdrop-blur-sm z-10">
            <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow-lg transform -rotate-12">
              Out of Stock
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
          <Link to={`/books/${_id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-6 py-2.5 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-50 shadow-lg">
              View Details
            </motion.button>
          </Link>
        </div>

        <div className="absolute top-3 left-3 z-20">
          <span className="bg-white/95 dark:bg-slate-900/90 backdrop-blur text-emerald-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-500 mb-3">by {author}</p>

          <div className="flex items-center gap-1 mb-4">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(rating || 0)
                      ? "fill-current"
                      : "text-slate-300 dark:text-slate-600"
                  }
                />
              ))}
            </div>
            <span className="text-xs text-slate-400 font-medium ml-1">
              ({rating || 0})
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <span className="text-xl font-bold text-slate-900 dark:text-white">
            ${price}
          </span>
          <Link
            to={`/books/${_id}`}
            className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors">
            <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BookCard;
