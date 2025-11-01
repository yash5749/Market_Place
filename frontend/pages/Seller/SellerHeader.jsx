// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axiosInstance from "../../utils/axiosInstance";

// const SellerHeader = () => {
//   const navigate = useNavigate();
//   const seller = JSON.parse(localStorage.getItem("seller") || "{}");

//   const handleLogout = async () => {
//     try {
//       const res = await axiosInstance.post(
//         "/seller/logout",
//         {},
//         { withCredentials: true }
//       );
//       console.log("✅ Logout successful:", res.data);

//       localStorage.removeItem("seller");
//       navigate("/login");
//     } catch (err) {
//       console.error("❌ Logout failed:", err.response?.data || err.message);
//       alert("Logout failed — please try again.");
//     }
//   };

//   return (
//     <div className="navbar bg-base-100 shadow-sm px-6">
//       {/* ===== Left: Logo / Brand ===== */}
//       <div className="navbar-start">
//         <Link
//           to="/"
//           className="text-1xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent select-none tracking-tight"
//         >
//           Market PLace
//         </Link>
//       </div>

//       {/* ===== Center: Menu (desktop) ===== */}
//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 text-base font-medium">
//           <li>
//             <Link to="/seller/dashboard">Dashboard</Link>
//           </li>
//           <li>
//             <Link to="/seller/upload">Upload Bike</Link>
//           </li>
//           <li>
//             <Link to="/seller/mybikes">View Bikes</Link>
//           </li>
//         </ul>
//       </div>

//       {/* ===== Right: Logout ===== */}
//       <div className="navbar-end">
//         <button onClick={handleLogout} className="btn btn-error">
//           Logout
//         </button>
//       </div>

//       {/* ===== Mobile Dropdown ===== */}
//       <div className="dropdown dropdown-end lg:hidden">
//         <label tabIndex={0} className="btn btn-ghost">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </label>
//         <ul
//           tabIndex={0}
//           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
//         >
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/seller/upload">Upload Bike</Link>
//           </li>
//           <li>
//             <Link to="/seller/viewbikes">View Bikes</Link>
//           </li>
//           <li>
//             <button
//               onClick={handleLogout}
//               className="btn btn-error btn-sm mt-2"
//             >
//               Logout
//             </button>
//           </li>
//         </ul>

//         <div className="flex-none gap-4">
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
//                 <img
//                   alt="seller avatar"
//                   src={`https://ui-avatars.com/api/?name=${seller.fullName || "Seller"}&background=random`}
//                 />
//               </div>
//             </div>
//             <ul
//               tabIndex={0}
//               className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
//             >
//               <li><a onClick={() => navigate("/seller/dashboard")}>Dashboard</a></li>
//               <li><a onClick={() => navigate("/seller/upload")}>Upload Bike</a></li>
//               <li><a onClick={() => navigate("/seller/mybikes")}>My Bikes</a></li>
//               <li><a className="text-error" onClick={handleLogout}>Logout</a></li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SellerHeader;


import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SellerHeader = () => {
  const navigate = useNavigate();
  const seller = JSON.parse(localStorage.getItem("seller") || "{}");


  const handleLogout = async () => {
    try {
      const res = await axiosInstance.post(
        "/seller/logout",
        {},
        { withCredentials: true }
      );
      console.log("✅ Logout successful:", res.data);

      localStorage.removeItem("seller");
      navigate("/login");
    } catch (err) {
      console.error("❌ Logout failed:", err.response?.data || err.message);
      alert("Logout failed — please try again.");
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-6">
      {/* ===== Left: Logo / Brand ===== */}
      <div className="flex-1">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent select-none tracking-tight"
        >
          Market Place
        </Link>
      </div>

      {/* ===== Center: Menu (Desktop) ===== */}
      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-base font-medium">
          <li><Link to="/seller/dashboard">Dashboard</Link></li>
          <li><Link to="/seller/upload">Upload Bike</Link></li>
          <li><Link to="/seller/mybikes">My Bikes</Link></li>
        </ul>
      </div>

      {/* ===== Right: Avatar Dropdown ===== */}
      <div className="flex-none gap-4">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt="seller avatar"
                src={`https://ui-avatars.com/api/?name=${
                  seller.fullName || "Seller"
                }&background=random`}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a onClick={() => navigate("/seller/dashboard")}>Dashboard</a></li>
            <li><a onClick={() => navigate("/seller/upload")}>Upload Bike</a></li>
            <li><a onClick={() => navigate("/seller/mybikes")}>My Bikes</a></li>
            <li><a className="text-error" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      <div className="dropdown dropdown-end lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        >
          <li><Link to="/seller/dashboard">Dashboard</Link></li>
          <li><Link to="/seller/upload">Upload Bike</Link></li>
          <li><Link to="/seller/mybikes">My Bikes</Link></li>
          <li><button onClick={handleLogout} className="text-error">Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default SellerHeader;
