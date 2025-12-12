import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Menu, X, Sun, Moon, LogOut, BookOpen, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  const navLinks = (
    <>
      <motion.li variants={navItemVariants} whileHover={{ scale: 1.05 }}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 dark:text-emerald-400 font-bold tracking-wide"
              : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
          }>
          Home
        </NavLink>
      </motion.li>
      <motion.li variants={navItemVariants} whileHover={{ scale: 1.05 }}>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 dark:text-emerald-400 font-bold tracking-wide"
              : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
          }>
          All Books
        </NavLink>
      </motion.li>
      {user && (
        <motion.li variants={navItemVariants} whileHover={{ scale: 1.05 }}>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-600 dark:text-emerald-400 font-bold tracking-wide"
                : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            }>
            Dashboard
          </NavLink>
        </motion.li>
      )}
    </>
  );

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-sm border-slate-200 dark:border-slate-800"
          : "bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm border-transparent"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="bg-emerald-600 p-1.5 rounded-lg shadow-lg shadow-emerald-500/20">
              <BookOpen className="text-white h-6 w-6" />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent tracking-tight group-hover:opacity-80 transition-opacity">
              BookCourier
            </span>
          </Link>

          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">{navLinks}</ul>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileTap={{ scale: 0.9, rotate: 180 }}
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>

            {loading ? (
              <Loader2 className="animate-spin text-emerald-500" size={20} />
            ) : user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-9 w-9 rounded-full object-cover border-2 border-emerald-500 shadow-sm cursor-pointer"
                  src={user?.photoURL}
                  alt={user?.displayName}
                  title={user?.displayName}
                />
                <motion.button
                  whileHover={{ scale: 1.1, color: "#ef4444" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLogout}
                  className="p-2 text-slate-500 transition-colors">
                  <LogOut size={20} />
                </motion.button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-lg text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors">
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileTap={{ rotate: 180 }}
              onClick={handleThemeToggle}
              className="text-slate-700 dark:text-slate-200">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </motion.button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-200 p-1">
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 overflow-hidden backdrop-blur-lg">
            <ul className="px-4 pt-4 pb-6 space-y-2">
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}>
                <NavLink
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`
                  }>
                  Home
                </NavLink>
              </motion.li>
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}>
                <NavLink
                  to="/books"
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                        : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`
                  }>
                  All Books
                </NavLink>
              </motion.li>
              {user && (
                <motion.li
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}>
                  <NavLink
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                          : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`
                    }>
                    Dashboard
                  </NavLink>
                </motion.li>
              )}
              <motion.li
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800">
                {user ? (
                  <div className="flex flex-col gap-4 px-2">
                    <div className="flex items-center gap-3">
                      <img
                        className="h-10 w-10 rounded-full object-cover border-2 border-emerald-500"
                        src={user?.photoURL}
                        alt={user?.displayName}
                      />
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {user?.displayName}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-center px-4 py-3 text-red-500 font-bold bg-red-50 dark:bg-red-900/10 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-2 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="py-3 text-center text-emerald-600 border border-emerald-200 dark:border-emerald-800 rounded-xl font-bold hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="py-3 text-center bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg">
                      Register
                    </Link>
                  </div>
                )}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
