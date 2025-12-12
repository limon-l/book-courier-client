import { motion } from "framer-motion";

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="text-center mb-16 px-4">
      {subHeading && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="block text-emerald-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-3">
          {subHeading}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
        {heading}
      </motion.h2>
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 100, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="h-1.5 bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full mx-auto"></motion.div>
    </div>
  );
};

export default SectionTitle;
