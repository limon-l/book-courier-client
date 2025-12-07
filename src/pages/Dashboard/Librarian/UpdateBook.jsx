import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading";

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit } = useForm();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  const onSubmit = async (data) => {
    const updatedBook = {
      title: data.title,
      author: data.author,
      image: data.image,
      category: data.category,
      rating: parseFloat(data.rating),
      status: data.status,
    };

    const res = await axiosSecure.patch(`/books/${id}`, updatedBook);
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.title} is updated!`,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/dashboard/my-books");
    }
  };

  return (
    <div>
      <SectionTitle heading="Update Book" subHeading="Edit details" />
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
              Book Title
            </label>
            <input
              defaultValue={book.title}
              {...register("title")}
              type="text"
              className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Author
              </label>
              <input
                defaultValue={book.author}
                {...register("author")}
                type="text"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Category
              </label>
              <select
                defaultValue={book.category}
                {...register("category")}
                className="select w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500">
                <option value="Fiction">Fiction</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Image URL
              </label>
              <input
                defaultValue={book.image}
                {...register("image")}
                type="url"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Rating
              </label>
              <input
                defaultValue={book.rating}
                {...register("rating")}
                type="number"
                step="0.1"
                max="5"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
              Status (Visibility)
            </label>
            <select
              defaultValue={book.status}
              {...register("status")}
              className="select w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="published">Published</option>
              <option value="unpublished">Unpublished</option>
            </select>
          </div>

          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-500/20">
            Update Book Details
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
