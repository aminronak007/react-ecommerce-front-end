import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Sidebar = () => {
  const handleSignOut = (e) => {
    Cookies.remove("adminToken");
    toast.info("Logged Out Successfully");
  };
  return (
    <CDBSidebar textColor="#fff" backgroundColor="#000">
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
        <a
          href="/admin/dashboard"
          className="text-decoration-none"
          style={{ color: "inherit" }}
        >
          MERN STORE
        </a>
      </CDBSidebarHeader>

      <CDBSidebarContent className="sidebar-content">
        <CDBSidebarMenu>
          <NavLink
            className="text-decoration-none"
            exact
            to="/admin/dashboard"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            className="text-decoration-none"
            exact
            to="/admin/categories"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="list-ul">Categories</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            exact
            to="/admin/sub-categories"
            activeClassName="activeClicked"
            className="text-decoration-none"
          >
            <CDBSidebarMenuItem icon="th-list">
              Sub Categories
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            className="text-decoration-none"
            exact
            to="/admin/products"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="box-open">Products</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            className="text-decoration-none"
            exact
            to="/admin/orders"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="cart-arrow-down">
              Orders
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            className="text-decoration-none"
            exact
            to="/admin/coupons"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="fas fa-tags">Coupons</CDBSidebarMenuItem>
          </NavLink>
          <NavLink
            onClick={handleSignOut}
            className="text-decoration-none"
            exact
            to="/admin"
            activeClassName="activeClicked"
          >
            <CDBSidebarMenuItem icon="sign-out-alt">Logout</CDBSidebarMenuItem>
          </NavLink>
        </CDBSidebarMenu>
      </CDBSidebarContent>
    </CDBSidebar>
  );
};

export default Sidebar;
