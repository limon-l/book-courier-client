import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] w-full gap-5">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="w-20 h-20 border-4 border-emerald-100 dark:border-emerald-900/30 rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute w-20 h-20 border-4 border-emerald-500 rounded-full border-t-transparent border-l-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute text-emerald-600 dark:text-emerald-400"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: "reverse",
          }}>
          <BookOpen size={28} />
        </motion.div>
      </div>

      <motion.p
        className="text-emerald-600 dark:text-emerald-400 font-bold text-xs tracking-[0.3em] uppercase"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
        Loading
      </motion.p>
    </div>
  );
};

export default Loading;
