import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Shared/Loading";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const FormDropdown = ({ label, options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative w-full">
      <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex justify-between items-center text-slate-700 dark:text-white cursor-pointer focus:ring-2 focus:ring-emerald-500 transition-all hover:border-emerald-500">
        <span
          className={
            value ? "text-slate-900 dark:text-white" : "text-slate-400"
          }>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </div>

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

const UpdateBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const selectedCategory = watch("category");
  const selectedStatus = watch("status");

  useEffect(() => {
    if (book) {
      reset(book);
      setValue("category", book.category);
      setValue("status", book.status);
    }
  }, [book, reset, setValue]);

  useEffect(() => {
    register("category", { required: true });
    register("status", { required: true });
  }, [register]);

  if (isLoading) return <Loading />;

  const categories = [
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

  const statusOptions = [
    { label: "Published", value: "published" },
    { label: "Unpublished", value: "unpublished" },
  ];

  const onSubmit = async (data) => {
    const updatedBook = {
      title: data.title,
      author: data.author,
      image: data.image,
      category: data.category,
      price: parseFloat(data.price),
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

  const inputMotion = {
    rest: { scale: 1, borderColor: "" },
    focus: {
      scale: 1.01,
      borderColor: "#10B981",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div>
      <SectionTitle heading="Update Book" subHeading="Edit details" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="form-control w-full">
            <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
              Book Title
            </label>
            <motion.input
              variants={inputMotion}
              whileFocus="focus"
              defaultValue={book.title}
              {...register("title")}
              type="text"
              className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Author
              </label>
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
                defaultValue={book.author}
                {...register("author")}
                type="text"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-colors"
              />
            </div>

            <FormDropdown
              label="Category"
              options={categories}
              value={selectedCategory}
              onChange={(val) => setValue("category", val)}
              placeholder="Select Category"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Price ($)
              </label>
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
                defaultValue={book.price}
                {...register("price")}
                type="number"
                step="0.01"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-colors"
              />
            </div>
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Rating
              </label>
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
                defaultValue={book.rating}
                {...register("rating")}
                type="number"
                step="0.1"
                max="5"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-colors"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
              Image URL
            </label>
            <motion.input
              variants={inputMotion}
              whileFocus="focus"
              defaultValue={book.image}
              {...register("image")}
              type="url"
              className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white transition-colors"
            />
          </div>

          <FormDropdown
            label="Status (Visibility)"
            options={statusOptions}
            value={selectedStatus}
            onChange={(val) => setValue("status", val)}
            placeholder="Select Status"
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-500/20">
            Update Book Details
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateBook;
