import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import ForgetPassword from "../pages/auth/ForgetPassword";
import SingUp from "../pages/auth/SingUp";
import AdminPanel from "../pages/admin/AdminPanel";
import AllUser from "../pages/user/AllUser";
import AllProduct from "../pages/product/AllProduct";
import CategoryProduct from "../pages/product/CategoryProduct";
import ProductDetails from "../pages/product/ProductDetails";
import Cart from "../pages/product/Cart";
import SearchProduct from "../pages/search/SearchProduct";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "sing-up", element: <SingUp /> },
      { path: "product-category", element: <CategoryProduct /> },
      { path: "product/:id", element: <ProductDetails /> },
      { path: "cart", element: <Cart /> },
      { path: "search", element: <SearchProduct /> },
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          { path: "all-user", element: <AllUser /> },
          { path: "all-product", element: <AllProduct /> },
        ],
      },
    ],
  },
]);

export default router;
