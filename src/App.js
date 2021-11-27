import React from "react";
import { Switch, Route } from "react-router-dom";
import Main from "./pages/Home/Main/Main";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AdminLogin from "./pages/Admin/AdminLogin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard/Dashboad";
import ForgotPassword from "./pages/Home/ForgotPassword/ForgotPassword";

import ViewCategories from "./pages/Admin/Categories/ViewCategories";
import CreateCategory from "./pages/Admin/Categories/CreateCategory";
import UpdateCategory from "./pages/Admin/Categories/UpdateCategory";

import ViewSubCategories from "./pages/Admin/SubCategories/ViewSubCategories";
import CreateSubCategory from "./pages/Admin/SubCategories/CreateSubCategory";
import UpdateSubCategory from "./pages/Admin/SubCategories/UpdateSubCategory";

import ViewProducts from "./pages/Admin/Products/ViewProducts";

import CreateProducts from "./pages/Admin/Products/CreateProducts";
import UpdateProduct from "./pages/Admin/Products/UpdateProduct";

import ViewOrders from "./pages/Admin/Orders/ViewOrders";
import ProductDetailsView from "./pages/ProductsDetailsView/ProductsDetailsView";
import CategoryHome from "./pages/Category/CategoryHome";
import SubCategoryHome from "./pages/SubCategory/SubCategoryHome";
import Cart from "./pages/Cart/Cart";
import SideDrawer from "./Components/Drawer/SideDrawer";
import Header from "./Components/Header/Header";
import Checkout from "./pages/Checkout/Checkout";
import CreateCoupon from "./pages/Admin/Coupons/CreateCoupon";
import ViewCoupons from "./pages/Admin/Coupons/ViewCoupons";
import Payment from "./pages/Payment/Payment";
import Shop from "./pages/Shop/Shop";
import History from "./pages/User/History";
import Wishlist from "./pages/User/Wishlist";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

const App = () => {
  const pathname = window.location.pathname;
  return (
    <>
      {pathname.includes("/admin") ? null : <Header />}

      <SideDrawer />
      <ToastContainer />
      <Switch>
        {/* ---------- Home Routes ---------- */}
        <Route exact path="/" component={Main} />
        <Route exact path="/home" component={Main} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetpassword/:id" component={ResetPassword} />
        <Route exact path="/product/:slug" component={ProductDetailsView} />
        <Route exact path="/category/:slug" component={CategoryHome} />
        <Route exact path="/subcategory/:slug" component={SubCategoryHome} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/shop" component={Shop} />
        <Route exact path="/user/history" component={History} />
        <Route exact path="/wishlist" component={Wishlist} />
        {/* ---------- Home Routes ---------- */}

        {/* ---------- Admin Routes ---------- */}
        <Route exact path="/admin" component={AdminLogin} />
        <Route exact path="/admin/dashboard" component={Dashboard} />

        {/* Category Routes */}
        <Route exact path="/admin/categories" component={ViewCategories} />
        <Route exact path="/admin/add/category" component={CreateCategory} />
        <Route
          exact
          path="/admin/update/category/:slug"
          component={UpdateCategory}
        />
        {/* Category Routes */}

        {/* Sub Category Routes */}
        <Route
          exact
          path="/admin/sub-categories"
          component={ViewSubCategories}
        />
        <Route
          exact
          path="/admin/add/sub-category"
          component={CreateSubCategory}
        />
        <Route
          exact
          path="/admin/update/sub-category/:slug"
          component={UpdateSubCategory}
        />
        {/* Sub Category Routes */}

        {/* Product Routes */}
        <Route exact path="/admin/add/products" component={CreateProducts} />
        <Route exact path="/admin/products" component={ViewProducts} />
        <Route
          exact
          path="/admin/update/product/:slug"
          component={UpdateProduct}
        />
        {/* Product Routes */}

        {/* Product Routes */}
        <Route exact path="/admin/orders" component={ViewOrders} />
        {/* Product Routes */}

        {/* Coupon Routes */}
        <Route exact path="/admin/create/coupons" component={CreateCoupon} />
        <Route exact path="/admin/coupons" component={ViewCoupons} />
        {/* Coupon Routes */}
        {/* ---------- Admin Routes ---------- */}
      </Switch>
    </>
  );
};
export default App;
