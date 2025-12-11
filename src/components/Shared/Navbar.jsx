import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Menu, X, Sun, Moon, LogOut, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
          }>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/books"
          className={({ isActive }) =>
            isActive
              ? "text-emerald-600 dark:text-emerald-400 font-bold"
              : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
          }>
          All Books
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "text-emerald-600 dark:text-emerald-400 font-bold"
                : "text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-medium transition-colors"
            }>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg">
              <BookOpen className="text-white h-6 w-6" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              LightHouse
            </span>
          </Link>

          <div className="hidden md:block">
            <ul className="flex items-center space-x-8">{navLinks}</ul>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                <img
                  className="h-9 w-9 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-500 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 rounded-lg text-emerald-600 dark:text-emerald-400 font-semibold hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/20">
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={handleThemeToggle}
              className="text-slate-700 dark:text-slate-200">
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-200">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
            <ul className="px-4 pt-2 pb-4 space-y-2">
              {navLinks}
              <li className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-500 font-medium hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">
                    Logout
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-3 px-2 pt-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 text-center text-emerald-600 border border-emerald-200 dark:border-emerald-800 rounded-lg font-semibold">
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="py-2.5 text-center bg-emerald-600 text-white rounded-lg font-semibold">
                      Register
                    </Link>
                  </div>
                )}
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
