import { Outlet, useLocation, useNavigation } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";

const MainLayout = () => {
  const location = useLocation();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="font-sans text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 min-h-screen flex flex-col transition-colors duration-300 overflow-x-hidden">
      <Navbar />

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <Loader2 className="animate-spin text-emerald-600" size={50} />
        </div>
      )}

      <div className="flex-grow w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="w-full h-full">
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
