// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";

// const SellerDashboard = () => {
//   const navigate = useNavigate();
//   const seller = JSON.parse(localStorage.getItem("seller") || "{}");

//   // Redirect if not logged in
//   useEffect(() => {
//     if (!seller._id) {
//       navigate("/login");
//     }
//   }, [seller, navigate]);

// //   const handleLogout = async () => {
// //     try {
// //       await axiosInstance.post("/seller/logout", {}, { withCredentials: true });

// //     } catch (err) {
// //       console.error("Logout failed:", err.response?.data || err.message);
// //     } finally {
// //       localStorage.removeItem("seller");
// //       navigate("/login");
// //     }
// //   };

// const handleLogout = async () => {
//   try {
//     const res = await axiosInstance.post("/seller/logout", {}, { withCredentials: true });
//     console.log("✅ Logout successful:", res.data);
    
//     localStorage.removeItem("seller");
//     navigate("/login");
//   } catch (err) {
//     console.error("❌ Logout failed:", err.response?.data || err.message);
//     alert("Logout failed — please try again.");
//   }
// };


//   // Derived data
//   const totalBikes = seller.bikeListed?.length || 0;
//   const publishedBikes =
//     seller.bikeListed?.filter((b) => b.status === "Published").length || 0;

//   return (
//     <div className="min-h-screen bg-base-200 flex flex-col items-center p-6">
//       <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-lg p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-3xl font-bold">
//               Welcome, {seller.fullName || "Seller"}
//             </h1>
//             <p className="text-gray-500">{seller.email}</p>
//           </div>
          
//         </div>

//         {/* Seller Info */}
//         <div className="mb-8">
//           <h2 className="text-xl font-semibold mb-2">Your Details</h2>
//           <ul className="list-disc list-inside text-gray-700">
//             <li><strong>Phone:</strong> {seller.phoneNumber || "N/A"}</li>
//             <li>
//               <strong>Address:</strong>{" "}
//               {seller.address?.addline1 || "N/A"},{" "}
//               {seller.address?.city || ""},{" "}
//               {seller.address?.state || ""}
//             </li>
//             <li>
//               <strong>Joined:</strong>{" "}
//               {seller.createdAt
//                 ? new Date(seller.createdAt).toLocaleDateString()
//                 : "N/A"}
//             </li>
//           </ul>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
//           <div className="card bg-primary text-primary-content p-6">
//             <h2 className="text-lg font-semibold">Total Bikes</h2>
//             <p className="text-2xl font-bold mt-2">{totalBikes}</p>
//           </div>
//           <div className="card bg-secondary text-secondary-content p-6">
//             <h2 className="text-lg font-semibold">Published Bikes</h2>
//             <p className="text-2xl font-bold mt-2">{publishedBikes}</p>
//           </div>
//           <div className="card bg-accent text-accent-content p-6">
//             <h2 className="text-lg font-semibold">Revenue</h2>
//             <p className="text-2xl font-bold mt-2">₹0</p>
//           </div>
//         </div>

//         {/* Navigation Buttons */}
//         <div className="flex flex-col sm:flex-row justify-center gap-6">
//           <button
//             onClick={() => navigate("/seller/upload")}
//             className="btn btn-primary w-full sm:w-auto"
//           >
//             Upload New Bike
//           </button>
//           <button
//             onClick={() => navigate("/seller/mybikes")}
//             className="btn btn-secondary w-full sm:w-auto"
//           >
//             View My Bikes
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;


import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem("seller") || "{}");

  useEffect(() => {
    if (!seller._id) navigate("/login");
  }, [seller, navigate]);

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/seller/logout", {}, { withCredentials: true });
      localStorage.removeItem("seller");
      navigate("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err.response?.data || err.message);
      alert("Logout failed — please try again.");
    }
  };

  const totalBikes = seller.bikeListed?.length || 0;
  const publishedBikes =
    seller.bikeListed?.filter((b) => b.status === "Published").length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 flex flex-col">
      {/* ✅ Navbar */}
      
      {/* ✅ Content */}
      <div className="flex-grow flex justify-center items-start p-6">
        <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-xl p-8 mt-6 space-y-8">

          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-b pb-4">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-1">
                Welcome, {seller.fullName || "Seller"}
              </h2>
              <p className="text-sm text-gray-500">{seller.email}</p>
            </div>
            <button onClick={handleLogout} className="btn btn-error mt-4 sm:mt-0">
              Logout
            </button>
          </div>

          {/* Stats Section */}
          <div className="stats stats-vertical lg:stats-horizontal shadow w-full">
            <div className="stat place-items-center">
              <div className="stat-title">Total Bikes</div>
              <div className="stat-value text-primary">{totalBikes}</div>
              <div className="stat-desc">All uploaded bikes</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Published Bikes</div>
              <div className="stat-value text-secondary">{publishedBikes}</div>
              <div className="stat-desc">Currently visible to users</div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-title">Revenue</div>
              <div className="stat-value text-accent">₹0</div>
              <div className="stat-desc">Coming soon</div>
            </div>
          </div>

          {/* Seller Info */}
          <div className="card bg-base-200 shadow-md p-6">
            <h3 className="text-xl font-semibold mb-3">Your Details</h3>
            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <p><strong>Phone:</strong> {seller.phoneNumber || "N/A"}</p>
              <p>
                <strong>Address:</strong>{" "}
                {seller.address?.addline1 || "N/A"},{" "}
                {seller.address?.city || ""},{" "}
                {seller.address?.state || ""}
              </p>
              <p className="sm:col-span-2">
                <strong>Joined:</strong>{" "}
                {seller.createdAt
                  ? new Date(seller.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
            <button
              onClick={() => navigate("/seller/upload")}
              className="btn btn-primary btn-wide"
            >
              Upload New Bike
            </button>
            <button
              onClick={() => navigate("/seller/mybikes")}
              className="btn btn-secondary btn-wide"
            >
              View My Bikes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
