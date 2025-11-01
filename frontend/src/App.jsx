import { Routes, Route, Outlet } from "react-router-dom";
import Header from "../pages/Buyer/Header";
import BikeSearch from "../pages/Buyer/BikeSearch";
import SellerLogin from "../pages/Auth/SellerLogin";
import SellerSignup from "../pages/Auth/SellerSignup";
import Home from "../pages/Buyer/Home";
import ProtectedRoute from "../components/ProtectedRoute";
import SellerDashboard from "../pages/Seller/SellerDashboard";
import SellerBikeList from "../pages/Seller/SellerBikeList";
import UploadBikeForm from "../pages/Seller/UploadBikeForm";
import SellerHeader from "../pages/Seller/SellerHeader";

function Layout() {
  return (
    <>
      <Header />
      <Outlet /> {/* This renders the nested route content */}
    </>
  );
}

function SellerLayout() {
  return (
    <>
      <ProtectedRoute>
        <SellerHeader />
        <Outlet />
      </ProtectedRoute>
    </>
  );
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<BikeSearch />} />
          <Route path="/login" element={<SellerLogin />} />
          <Route path="/seller/signup" element={<SellerSignup />} />
        </Route>

        <Route element={<SellerLayout />}>
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/upload"
            element={
              <ProtectedRoute>
                <UploadBikeForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/seller/mybikes"
            element={
              <ProtectedRoute>
                <SellerBikeList />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <div></div>
    </>
  );
}

export default App;
