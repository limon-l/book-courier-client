import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data: books = [], refetch } = useQuery({
    queryKey: ["all-books-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books");
      return res.data;
    },
  });

  const handleDeleteBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will also delete all associated orders!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/books/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({ title: "Deleted!", icon: "success" });
            refetch();
          }
        });
      }
    });
  };

  const handleToggleStatus = (book) => {
    const newStatus = book.status === "published" ? "unpublished" : "published";
    axiosSecure
      .patch(`/books/status/${book._id}`, { status: newStatus })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Book is now ${newStatus}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div>
      <SectionTitle heading="Manage Books" subHeading="Admin Controls" />
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
        <table className="table w-full">
          <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
            <tr>
              <th className="py-4 pl-6 text-left">Book</th>
              <th className="py-4 text-left">Librarian</th>
              <th className="py-4 text-left">Status</th>
              <th className="py-4 pr-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300">
            {books.map((book) => (
              <tr
                key={book._id}
                className="border-b border-slate-100 dark:border-slate-800 last:border-none">
                <td className="py-4 pl-6 font-bold">{book.title}</td>
                <td className="py-4 text-sm">{book.librarianEmail}</td>
                <td className="py-4">
                  <button
                    onClick={() => handleToggleStatus(book)}
                    className={`px-3 py-1 rounded-full text-xs font-bold capitalize cursor-pointer ${
                      book.status === "published"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-slate-200 text-slate-600"
                    }`}>
                    {book.status}
                  </button>
                </td>
                <td className="py-4 pr-6 text-right">
                  <button
                    onClick={() => handleDeleteBook(book._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;
