import { useState } from "react";
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
  Menu,
  LogOut,
} from "lucide-react";

const MenuLink = ({ to, icon: Icon, label, isSidebarOpen }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/30"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`
    }>
    <Icon size={20} className="shrink-0" />
    <span
      className={`${
        !isSidebarOpen && "hidden"
      } whitespace-nowrap transition-all duration-300`}>
      {label}
    </span>
  </NavLink>
);

const Sidebar = () => {
  const { logOut } = useAuth();
  const [role] = useRole();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <aside
      className={`
                fixed md:static inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 
                transition-all duration-300 flex flex-col h-full
                ${isSidebarOpen ? "w-64" : "w-20"}
            `}>
      <div className="p-6 flex items-center justify-between h-20 border-b border-slate-100 dark:border-slate-800">
        <Link
          to="/"
          className={`font-bold text-xl text-emerald-600 truncate ${
            !isSidebarOpen && "hidden"
          }`}>
          BookCourier
        </Link>
        <button
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500">
          {isSidebarOpen ? <Menu size={20} /> : <Menu size={24} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-hide">
        {role === "user" && (
          <>
            <div
              className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-4 ${
                !isSidebarOpen && "hidden"
              }`}>
              My Library
            </div>
            <MenuLink
              to="/dashboard/my-orders"
              icon={ShoppingBag}
              label="My Orders"
              isSidebarOpen={isSidebarOpen}
            />
            <MenuLink
              to="/dashboard/wishlist"
              icon={Heart}
              label="My Wishlist"
              isSidebarOpen={isSidebarOpen}
            />
            <MenuLink
              to="/dashboard/invoices"
              icon={FileText}
              label="Invoices"
              isSidebarOpen={isSidebarOpen}
            />
          </>
        )}

        {(role === "librarian" || role === "admin") && (
          <>
            <div
              className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-4 ${
                !isSidebarOpen && "hidden"
              }`}>
              Library Mgmt
            </div>
            <MenuLink
              to="/dashboard/add-book"
              icon={PlusCircle}
              label="Add Book"
              isSidebarOpen={isSidebarOpen}
            />
            <MenuLink
              to="/dashboard/my-books"
              icon={BookOpen}
              label="My Books"
              isSidebarOpen={isSidebarOpen}
            />
            <MenuLink
              to="/dashboard/manage-orders"
              icon={Truck}
              label="Manage Orders"
              isSidebarOpen={isSidebarOpen}
            />
          </>
        )}

        {role === "admin" && (
          <>
            <div
              className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2 px-4 ${
                !isSidebarOpen && "hidden"
              }`}>
              Admin Panel
            </div>
            <MenuLink
              to="/dashboard/all-users"
              icon={Users}
              label="All Users"
              isSidebarOpen={isSidebarOpen}
            />
            <MenuLink
              to="/dashboard/manage-books"
              icon={LayoutDashboard}
              label="Manage Books"
              isSidebarOpen={isSidebarOpen}
            />
          </>
        )}

        <div
          className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6 px-4 ${
            !isSidebarOpen && "hidden"
          }`}>
          Settings
        </div>
        <MenuLink
          to="/dashboard/profile"
          icon={User}
          label="Profile"
          isSidebarOpen={isSidebarOpen}
        />

        <div className="border-t border-slate-100 dark:border-slate-800 mt-4 pt-4">
          <button
            onClick={() => logOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
            <LogOut size={20} />
            <span className={`${!isSidebarOpen && "hidden"}`}>Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
