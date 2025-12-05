import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SectionTitle from "../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import { Star, Search, Filter } from "lucide-react";
import Loading from "../../components/Shared/Loading";

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
  });

  if (isLoading) return <Loading />;

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <SectionTitle
        heading="Browse Collection"
        subHeading="Find your next read"
      />

      <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Thriller">Thriller</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
          </select>

          <select
            className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Default Sort</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300">
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
                  <button className="bg-white text-slate-900 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition duration-300 hover:bg-emerald-500 hover:text-white">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md uppercase tracking-wider">
                  {book.category}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    {book.rating}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                {book.title}
              </h3>
              <p className="text-sm text-slate-500 mb-4">by {book.author}</p>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-xl font-bold text-slate-900 dark:text-white">
                  ${book.price}
                </span>
                <Link
                  to={`/books/${book._id}`}
                  className="text-sm font-bold text-emerald-600 hover:underline">
                  Details &rarr;
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
