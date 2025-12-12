import { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import {
  ShoppingBag,
  User,
  PlusCircle,
  BookOpen,
  Users,
  LayoutDashboard,
  Truck,
  Heart,
  FileText,
  LogOut,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MenuLink = ({ to, icon: Icon, label, showLabel }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group overflow-hidden ${
        isActive
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`
    }>
    <div className="shrink-0">
      <Icon size={22} />
    </div>
    <AnimatePresence>
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10, transition: { duration: 0.1 } }}
          transition={{ duration: 0.2 }}
          className="whitespace-nowrap font-medium">
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  </NavLink>
);

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const { logOut } = useAuth();
  const [role, isLoading] = useRole();

  const sidebarVariants = {
    open: {
      width: "16rem",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    closed: {
      width: "5rem",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const closeMobile = () => setIsMobileOpen(false);

  if (isLoading) {
    return (
      <div className="hidden md:flex w-20 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" />
      </div>
    );
  }

  const showLabels = isMobileOpen || isSidebarOpen;

  return (
    <motion.aside
      initial={false}
      animate={
        window.innerWidth >= 768
          ? isSidebarOpen
            ? "open"
            : "closed"
          : undefined
      }
      variants={sidebarVariants}
      className={`
        fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full shadow-2xl md:shadow-none
        md:static
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        transition-transform duration-300 md:transition-none
        w-64 md:w-auto
      `}>
      <div className="p-4 flex items-center justify-between h-20 border-b border-slate-100 dark:border-slate-800">
        <Link
          to="/"
          className="flex items-center gap-2 overflow-hidden"
          onClick={closeMobile}>
          <AnimatePresence mode="wait">
            {showLabels ? (
              <motion.span
                key="full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-xl text-emerald-600 truncate">
                BookCourier
              </motion.span>
            ) : (
              <motion.span
                key="short"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-bold text-xl text-emerald-600 mx-auto">
                BC
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="hidden md:block p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
          {isSidebarOpen ? (
            <ChevronLeft size={20} />
          ) : (
            <ChevronRight size={20} />
          )}
        </button>

        <button
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
          <X size={20} />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
        {role === "user" && (
          <>
            {showLabels && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-4">
                My Library
              </motion.div>
            )}
            <div onClick={closeMobile}>
              <MenuLink
                to="/dashboard/my-orders"
                icon={ShoppingBag}
                label="My Orders"
                showLabel={showLabels}
              />
              <MenuLink
                to="/dashboard/wishlist"
                icon={Heart}
                label="My Wishlist"
                showLabel={showLabels}
              />
              <MenuLink
                to="/dashboard/invoices"
                icon={FileText}
                label="Invoices"
                showLabel={showLabels}
              />
            </div>
          </>
        )}

        {(role === "librarian" || role === "admin") && (
          <>
            {showLabels && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4 px-4">
                Library Mgmt
              </motion.div>
            )}
            <div onClick={closeMobile}>
              <MenuLink
                to="/dashboard/add-book"
                icon={PlusCircle}
                label="Add Book"
                showLabel={showLabels}
              />
              <MenuLink
                to="/dashboard/my-books"
                icon={BookOpen}
                label="My Books"
                showLabel={showLabels}
              />
              <MenuLink
                to="/dashboard/manage-orders"
                icon={Truck}
                label="Manage Orders"
                showLabel={showLabels}
              />
            </div>
          </>
        )}

        {role === "admin" && (
          <>
            {showLabels && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-4 px-4">
                Admin Panel
              </motion.div>
            )}
            <div onClick={closeMobile}>
              <MenuLink
                to="/dashboard/all-users"
                icon={Users}
                label="All Users"
                showLabel={showLabels}
              />
              <MenuLink
                to="/dashboard/manage-books"
                icon={LayoutDashboard}
                label="Manage Books"
                showLabel={showLabels}
              />
            </div>
          </>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          {showLabels && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-4">
              Settings
            </motion.div>
          )}
          <div onClick={closeMobile}>
            <MenuLink
              to="/dashboard/profile"
              icon={User}
              label="Profile"
              showLabel={showLabels}
            />
          </div>

          <button
            onClick={() => logOut()}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-1 group ${
              !showLabels && "justify-center"
            }`}>
            <LogOut size={22} className="shrink-0" />
            <AnimatePresence>
              {showLabels && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap font-medium">
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;
