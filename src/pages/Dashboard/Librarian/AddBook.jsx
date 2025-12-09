import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/Shared/SectionTitle";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
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

const AddBook = () => {
  const { register, handleSubmit, reset, setValue, watch } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const selectedCategory = watch("category");

  useEffect(() => {
    register("category", { required: true });
  }, [register]);

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
      setValue("category", "");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.title} is added to the database.`,
        showConfirmButton: false,
        timer: 1500,
      });
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
      <SectionTitle heading="Add a Book" subHeading="Expand the collection" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-4xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Book Title*
              </label>
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
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
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
                {...register("author", { required: true })}
                type="text"
                placeholder="Author"
                className="input w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormDropdown
              label="Category*"
              options={categories}
              value={selectedCategory}
              onChange={(val) => setValue("category", val)}
              placeholder="Select a category"
            />

            <div className="form-control w-full">
              <label className="label mb-2 block text-sm font-bold text-slate-700 dark:text-slate-300">
                Price ($)*
              </label>
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
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
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
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
              <motion.input
                variants={inputMotion}
                whileFocus="focus"
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
            <motion.input
              variants={inputMotion}
              whileFocus="focus"
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
            <motion.textarea
              variants={inputMotion}
              whileFocus="focus"
              {...register("description")}
              className="textarea w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all dark:text-white h-32"
              placeholder="Book Details"></motion.textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition shadow-lg shadow-emerald-500/20">
            Add Book
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBook;
