import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { Navigate } from "react-router-dom";



export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const localSeller = localStorage.getItem("seller");

      // if user exists locally, optimistically trust them for a short time
      if (localSeller) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      try {
        await axiosInstance.get("/seller/current", { withCredentials: true });
        setAuthorized(true);
      } catch {
        setAuthorized(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null;
  return authorized ? children : <Navigate to="/login" replace />;
}
