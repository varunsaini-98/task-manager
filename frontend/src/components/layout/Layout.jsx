import React from "react";
import { Navbar } from "./Navbar.jsx";
import { Sidebar } from "./Sidebar.jsx";

export const Layout = ({
  children,
  currentTab,
  setCurrentTab,
  search,
  setSearch,
}) => {
  return (
    <div className="app-container">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <div className="main-content">
        <Navbar search={search} setSearch={setSearch} />
        <main className="page-body">{children}</main>
      </div>
    </div>
  );
};
