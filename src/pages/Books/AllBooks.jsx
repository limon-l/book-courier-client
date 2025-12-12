import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import {
  Star,
  Search,
  RefreshCcw,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import Loading from "../../components/Shared/Loading";
import { motion, AnimatePresence } from "framer-motion";

const FilterDropdown = ({ options, value, onChange, defaultLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const listVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      height: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      height: "auto",
      transition: { when: "beforeChildren", staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10, x: -10 },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <div className="relative w-full md:w-56 z-30">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-center text-slate-600 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all hover:border-emerald-500">
        <span className="truncate">
          {selectedOption?.label || defaultLabel}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={listVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto z-50 scrollbar-thin scrollbar-thumb-emerald-200 dark:scrollbar-thumb-slate-600">
            {options.map((opt) => (
              <motion.li
                key={opt.value}
                variants={itemVariants}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 cursor-pointer text-sm transition-colors hover:bg-emerald-50 dark:hover:bg-slate-700 ${
                  value === opt.value
                    ? "bg-emerald-50 dark:bg-slate-700 text-emerald-600 font-medium"
                    : "text-slate-600 dark:text-slate-300"
                }`}>
                {opt.label}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

const AllBooks = () => {
  const axiosPublic = useAxiosPublic();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", searchTerm, sortBy, filterCategory],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/books?search=${searchTerm}&sort=${sortBy}&category=${filterCategory}`
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });

  const handleReset = () => {
    setSearchTerm("");
    setSortBy("");
    setFilterCategory("");
  };

  const categories = [
    { label: "All Categories", value: "" },
    { label: "Fiction", value: "Fiction" },
    { label: "Non-Fiction", value: "Non-Fiction" },
    { label: "Novel", value: "Novel" },
    { label: "Story", value: "Story" },
    { label: "Thriller", value: "Thriller" },
    { label: "History", value: "History" },
    { label: "Sci-Fi", value: "Sci-Fi" },
    { label: "Fantasy", value: "Fantasy" },
    { label: "Mystery", value: "Mystery" },
    { label: "Biography", value: "Biography" },
    { label: "Self-Help", value: "Self-Help" },
    { label: "Poetry", value: "Poetry" },
    { label: "Others", value: "Others" },
  ];

  const sortOptions = [
    { label: "Default Sort", value: "" },
    { label: "Price: Low to High", value: "price-asc" },
    { label: "Price: High to Low", value: "price-desc" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <SectionTitle
        heading="Browse Collection"
        subHeading="Find your next read"
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative z-20">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={20}
          />
          <input
            type="text"
            value={searchTerm}
            placeholder="Search by title or author..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition dark:text-white"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <FilterDropdown
            options={categories}
            value={filterCategory}
            onChange={setFilterCategory}
            defaultLabel="Filter Category"
          />
          <FilterDropdown
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            defaultLabel="Sort By"
          />
        </div>
      </motion.div>

      {isLoading ? (
        <div className="py-20">
          <Loading />
        </div>
      ) : books.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-full mb-4">
            <Search size={48} className="text-slate-400 dark:text-slate-500" />
          </div>
          <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200 mb-2">
            No book found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            We couldn't find any books matching your search.
          </p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-lg shadow-emerald-500/20 font-medium">
            <RefreshCcw size={18} /> See all books
          </button>
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 z-0">
          <AnimatePresence mode="popLayout">
            {books.map((book) => (
              <motion.div
                layout
                key={book._id}
                variants={item}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                <div className="h-[300px] overflow-hidden relative bg-slate-100 dark:bg-slate-800">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  {book.quantity === 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                      Out of Stock
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link to={`/books/${book._id}`}>
                      <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-300 hover:bg-emerald-500 hover:text-white shadow-lg cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur text-emerald-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-md uppercase tracking-wide">
                      {book.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                        {book.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">
                      by {book.author}
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={
                              i < Math.floor(book.rating || 0)
                                ? "fill-current"
                                : "text-slate-300 dark:text-slate-600"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-medium ml-1">
                        ({book.rating || 0})
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      ${book.price}
                    </span>
                    <Link
                      to={`/books/${book._id}`}
                      className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-full transition-colors cursor-pointer">
                      <ShoppingBag size={20} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default AllBooks;
