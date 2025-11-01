import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

export default function SellerLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ If already logged in, redirect to dashboard immediately
  // useEffect(() => {
  //   const storedSeller = localStorage.getItem("seller");
  //   if (storedSeller) {
  //     navigate("/seller/dashboard");
  //   }
  // }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("LOGIN SUBMIT FIRED");

  //   setError("");
  //   setLoading(true);

  //   try {
  //     console.log("Sending login request:", form);
  //     const res = await axiosInstance.post("/seller/login", form, {
  //       withCredentials: true,
  //     });

  //     console.log("Login response:", res);

  //     const { user } = res.data?.data || {};
  //     console.log("User from response:", user);

  //     // ✅ store seller data
  //     localStorage.setItem("seller", JSON.stringify(user));

  //     // ✅ redirect
  //     navigate("/seller/dashboard");
  //   } catch (err) {
  //     console.error("LOGIN ERROR:", err);
  //     setError(err.response?.data?.message || "Login failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("LOGIN SUBMIT FIRED");
  setError("");
  setLoading(true);

  try {
    console.log("Sending login request:", form);
    const res = await axiosInstance.post("/seller/login", form);
    console.log("Login response:", res);
    
    const { user, accessToken, refreshToken } = res.data?.data || {};

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("seller", JSON.stringify(user));

    navigate("/seller/dashboard");
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    setError(err.response?.data?.message || "Login failed");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-center mb-2">
            Seller Login
          </h2>

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
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            className={`btn btn-primary w-full ${loading && "loading"}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center mt-2">
            Don’t have an account?{" "}
            <Link to="/seller/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
