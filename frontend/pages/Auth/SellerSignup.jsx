// src/pages/Auth/SellerSignup.jsx
import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

export default function SellerSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: {
      addline1: "",
      addline2: "",
      city: "",
      state: "",
    },
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested address fields
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setForm((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [key]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Frontend validation
    if (!/^[0-9]{10}$/.test(form.phoneNumber)) {
      setError("Phone number must be exactly 10 digits");
      setLoading(false);
      return;
    }

    try {
      const res = await axiosInstance.post("/seller/register", form);

      // Success criteria
      if (res.status === 201 || res.data?.success) {
        console.log(res);
        
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Seller Signup
          </h2>

          {/* Basic Info */}
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="input input-bordered w-full"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number (10 digits)"
            className="input input-bordered w-full"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />

          {/* Address Section */}
          <div className="grid grid-cols-1 gap-2">
            <input
              type="text"
              name="address.addline1"
              placeholder="Address Line 1"
              className="input input-bordered w-full"
              value={form.address.addline1}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="address.addline2"
              placeholder="Address Line 2 (optional)"
              className="input input-bordered w-full"
              value={form.address.addline2}
              onChange={handleChange}
            />
            <div className="flex gap-2">
              <input
                type="text"
                name="address.city"
                placeholder="City"
                className="input input-bordered w-1/2"
                value={form.address.city}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address.state"
                placeholder="State"
                className="input input-bordered w-1/2"
                value={form.address.state}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          {/* Error */}
          {error && <p className="text-error text-sm">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading && "loading"}`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          {/* Redirect to Login */}
          <p className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/seller/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
