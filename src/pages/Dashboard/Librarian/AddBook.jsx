import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";

const AddBook = () => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    const priceValue = parseFloat(data.price);
    const quantityValue = parseInt(data.quantity);
    const ratingValue = parseFloat(data.rating);

    const bookItem = {
      title: data.title,
      author: data.author,
      image: data.image,
      price: isNaN(priceValue) ? 0 : priceValue,
      quantity: isNaN(quantityValue) ? 0 : quantityValue,
      category: data.category,
      description: data.description,
      rating: isNaN(ratingValue) ? 0 : ratingValue,
      status: "published",
      librarianEmail: user.email,
      librarianName: user.displayName,
      addedTime: new Date(),
    };

    const bookRes = await axiosSecure.post("/books", bookItem);
    if (bookRes.data.insertedId) {
      reset();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.title} is added to the database.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <SectionTitle heading="Add a Book" subHeading="Expand the collection" />
      <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Book Title*
              </label>
              <input
                {...register("title", { required: true })}
                type="text"
                placeholder="Title"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
              />
            </div>
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Author Name*
              </label>
              <input
                {...register("author", { required: true })}
                type="text"
                placeholder="Author"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Category*
              </label>
              <select
                defaultValue="default"
                {...register("category", { required: true })}
                className="select w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white">
                <option disabled value="default">
                  Select a category
                </option>
                <option value="Fiction">Fiction</option>
                <option value="Thriller">Thriller</option>
                <option value="History">History</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Biography">Biography</option>
              </select>
            </div>
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Price ($)*
              </label>
              <input
                {...register("price", { required: true })}
                type="number"
                step="0.01"
                placeholder="Price"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Quantity*
              </label>
              <input
                {...register("quantity", { required: true })}
                type="number"
                placeholder="Quantity"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
              />
            </div>
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Rating (0-5)*
              </label>
              <input
                {...register("rating", { required: true, min: 0, max: 5 })}
                type="number"
                step="0.1"
                placeholder="Initial Rating"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
              Image URL*
            </label>
            <input
              {...register("image", { required: true })}
              type="url"
              placeholder="Image URL"
              className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
            />
          </div>

          <div className="form-control">
            <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
              Description
            </label>
            <textarea
              {...register("description")}
              className="textarea w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white h-32"
              placeholder="Book Details"></textarea>
          </div>

          <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-500/20">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
