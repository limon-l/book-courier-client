import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import AllBooks from "../pages/Books/AllBooks";
import BookDetails from "../pages/Books/BookDetails";
import ErrorPage from "../pages/ErrorPage";

// User Dashboard Pages
import MyOrders from "../pages/Dashboard/User/MyOrders";
import MyWishlist from "../pages/Dashboard/User/MyWishlist";
import Invoices from "../pages/Dashboard/User/Invoices";
import Payment from "../pages/Dashboard/User/Payment";
import Profile from "../pages/Dashboard/Common/Profile";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/books", element: <AllBooks /> },
      {
        path: "/books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Common Routes
      { path: "profile", element: <Profile /> },

      // User Routes
      { path: "my-orders", element: <MyOrders /> },
      { path: "wishlist", element: <MyWishlist /> },
      { path: "invoices", element: <Invoices /> },
      { path: "payment/:id", element: <Payment /> },
    ],
  },
]);

export default Router;
