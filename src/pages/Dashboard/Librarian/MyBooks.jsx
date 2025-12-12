import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";

const MyBooks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/librarian/${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-full">
      <SectionTitle heading="My Books" subHeading="Manage your collection" />

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <span className="loading loading-spinner loading-lg text-emerald-600"></span>
        </div>
      )}

      {!isLoading && (
        <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-all duration-300">
          <table className="table w-full">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
              <tr>
                <th className="py-4 pl-6 text-left">Book</th>
                <th className="py-4 text-left">Author</th>
                <th className="py-4 text-left">Category</th>
                <th className="py-4 text-left">Status</th>
                <th className="py-4 pr-6 text-right">Update</th>
              </tr>
            </thead>

            <tbody className="text-slate-700 dark:text-slate-300">
              {books.map((book, index) => (
                <tr
                  key={book._id}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className="border-b border-slate-100 dark:border-slate-800 last:border-none animate-[fadeInUp_0.4s_ease]">
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-16">
                          <img
                            src={book.image}
                            alt={book.title}
                            className="object-cover rounded"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{book.title}</div>
                        <div className="text-sm opacity-50">${book.price}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4">{book.author}</td>

                  <td className="py-4">
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold">
                      {book.category}
                    </span>
                  </td>

                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold capitalize ${
                        book.status === "published"
                          ? "text-emerald-600 bg-emerald-50"
                          : "text-slate-500 bg-slate-100"
                      }`}>
                      {book.status}
                    </span>
                  </td>

                  <td className="py-4 pr-6 text-right">
                    <Link to={`/dashboard/update-book/${book._id}`}>
                      <button className="btn btn-ghost btn-sm text-emerald-600 hover:bg-emerald-50 p-2 rounded transition duration-300">
                        <Edit size={18} />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBooks;
