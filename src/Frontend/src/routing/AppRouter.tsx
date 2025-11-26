import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

const CustomerListPage = lazy(() => import("../pages/CustomerListPage"));
const EmployeeListPage = lazy(() => import("../pages/EmployeeListPage"));
const SupplierListPage = lazy(() => import("../pages/SupplierListPage"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/SupplierList" element={<SupplierListPage />} />
      <Route path="/CustomerList" element={<CustomerListPage />} />
      <Route path="/EmployeeList" element={<EmployeeListPage />} />
    </Routes>
  );
}
