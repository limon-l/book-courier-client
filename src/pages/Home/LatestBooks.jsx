import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, ArrowRight } from "lucide-react";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const LatestBooks = () => {
  const [books, setBooks] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setBooks([
          {
            _id: "1",
            title: "The Silent Patient",
            author: "Alex Michaelides",
            price: 12.99,
            image:
              "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop",
            category: "Thriller",
            rating: 4.8,
          },
          {
            _id: "2",
            title: "Educated",
            author: "Tara Westover",
            price: 15.5,
            image:
              "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop",
            category: "Memoir",
            rating: 4.9,
          },
          {
            _id: "3",
            title: "Becoming",
            author: "Michelle Obama",
            price: 18.0,
            image:
              "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=800&auto=format&fit=crop",
            category: "Biography",
            rating: 4.7,
          },
          {
            _id: "4",
            title: "Dune",
            author: "Frank Herbert",
            price: 14.99,
            image:
              "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=800&auto=format&fit=crop",
            category: "Sci-Fi",
            rating: 4.6,
          },
        ]);
      } catch (err) {
        console.error("Failed to fetch latest books:", err);
      }
    };

    fetchBooks();
  }, [axiosPublic]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="flex flex-col items-center mb-16 text-center">
        <span className="text-emerald-600 font-semibold tracking-wider uppercase text-sm mb-2">
          New Arrivals
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Latest Books
        </h2>
        <div className="w-24 h-1.5 bg-emerald-500 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book, i) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/20 overflow-hidden hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 group flex flex-col border border-slate-100 dark:border-slate-700/50">
            <div className="h-[280px] overflow-hidden relative">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                  to={`/books/${book._id}`}
                  className="bg-white text-emerald-600 px-6 py-2.5 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-emerald-50">
                  View Details
                </Link>
              </div>
              <div className="absolute top-3 left-3">
                <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur text-emerald-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                  {book.category}
                </span>
              </div>
            </div>

            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-slate-500 text-sm mb-3">by {book.author}</p>
              <div className="flex items-center gap-1 mb-4">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {book.rating}
                </span>
                <span className="text-xs text-slate-400 ml-1">
                  ({Math.floor(Math.random() * 50) + 10} reviews)
                </span>
              </div>

              <div className="mt-auto flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                <span className="text-xl font-bold text-emerald-600">
                  ${book.price}
                </span>
                <Link
                  to={`/books/${book._id}`}
                  className="text-slate-400 hover:text-emerald-500 transition-colors">
                  <ShoppingBag size={20} />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link
          to="/books"
          className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors border-b-2 border-emerald-100 hover:border-emerald-600 pb-0.5">
          View All Collection <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
};

export default LatestBooks;
