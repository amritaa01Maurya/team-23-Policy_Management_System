import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import PurchasePolicyPage from "./pages/PurchasePolicyPage";
import DashboardPage from "./pages/DashboardPage";
import AdminClaimsPage from "./pages/AdminClaimsPage";
import AdminProductsPage from "./pages/AdminProductsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route
            path="/purchase/:productId"
            element={
              <ProtectedRoute roles={["CUSTOMER"]}>
                <PurchasePolicyPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute roles={["CUSTOMER"]}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/claims"
            element={
              <ProtectedRoute roles={["ADMIN", "ADJUSTER"]}>
                <AdminClaimsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminProductsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
