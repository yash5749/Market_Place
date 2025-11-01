// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const SellerBikeList = () => {
//   const navigate = useNavigate();
//   const [bikes, setBikes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   // Load seller and their listed bikes from localStorage
//   const seller = JSON.parse(localStorage.getItem("seller") || "{}");

//   useEffect(() => {
//     if (!seller?._id) {
//       navigate("/login");
//       return;
//     }

//     // Seller already has their bikes inside localStorage
//     if (seller.bikeListed && seller.bikeListed.length > 0) {
//       setBikes(seller.bikeListed);
//       console.log(seller);
      
//     }
//     setLoading(false);
//   }, [navigate]);

//   // Delete bike by ID
//   const handleDelete = async (bikeId) => {
//     if (!window.confirm("Are you sure you want to delete this bike?")) return;
//     setDeletingId(bikeId);

//     try {
//       const res = await axiosInstance.delete(`/bike/${bikeId}`, {
//         withCredentials: true,
//       });
//       console.log("Deleted:", res.data);

//       // Update local state
//       const updatedBikes = bikes.filter((b) => b._id !== bikeId);
//       setBikes(updatedBikes);

//       // Also update localStorage seller data
//       const updatedSeller = { ...seller, bikeListed: updatedBikes };
//       localStorage.setItem("seller", JSON.stringify(updatedSeller));
//     } catch (err) {
//       console.error("Failed to delete bike:", err.response?.data || err.message);
//       alert("Error deleting bike. Try again.");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-xl">
//         Loading your bikes...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-200 p-6">
//       <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">My Listed Bikes</h1>
//           <button
//             className="btn btn-primary"
//             onClick={() => navigate("/seller/upload")}
//           >
//             + Upload New Bike
//           </button>
//         </div>

//         {bikes.length === 0 ? (
//           <div className="text-center text-gray-500 py-12">
//             <p>No bikes listed yet.</p>
//             <button
//               className="btn btn-primary mt-4"
//               onClick={() => navigate("/seller/upload")}
//             >
//               Upload a Bike
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bikes.map((bike) => (
//               <div
//                 key={bike}
//                 className="card bg-base-300 shadow-md rounded-lg overflow-hidden"
//               >
//                 <div className="card bg-base-300 shadow-md rounded-lg overflow-hidden">
//   {/* Thumbnail */}
//   {bike.image || (bike.photos && bike.photos.length > 0) ? (
//     <figure className="h-40 bg-base-200 flex justify-center items-center overflow-hidden">
//       <img
//         src={bike.image || bike.photos[0]}
//         alt={bike.bikeName || "Bike"}
//         className="object-cover w-full h-full"
//       />
//     </figure>
//   ) : (
//     <figure className="h-40 bg-base-200 flex justify-center items-center text-gray-500">
//       <span>No Image</span>
//     </figure>
//   )}

//                 <div className="card-body p-4">
//                     <h2 className="card-title text-lg font-semibold">
//                     {bike.bikeName || "Unnamed Bike"}
//                     </h2>
//                     <p className="text-sm text-gray-600">Bike ID: {bike._id}</p>

//                     <p className="mt-2">
//                     Status:
//                     <span
//                         className={`badge ml-2 ${
//                         bike.status === "Published" ? "badge-success" : "badge-warning"
//                         }`}
//                     >
//                         {bike.status}
//                     </span>
//                     </p>

//                     <div className="card-actions justify-end mt-4">
//                     <button
//                         className={`btn btn-error btn-sm ${
//                         deletingId === bike._id ? "loading" : ""
//                         }`}
//                         onClick={() => handleDelete(bike._id)}
//                         disabled={deletingId === bike._id}
//                     >
//                         {deletingId === bike._id ? "Deleting..." : "Delete"}
//                     </button>
//                     </div>
//                 </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerBikeList;




// import React, { useState, useEffect } from "react";
// import axiosInstance from "../../utils/axiosInstance";
// import { useNavigate } from "react-router-dom";

// const SellerBikeList = () => {
//   const navigate = useNavigate();
//   const [bikes, setBikes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);

//   // Load seller data
//   const seller = JSON.parse(localStorage.getItem("seller") || "{}");

//   useEffect(() => {
//     if (!seller?._id) {
//       navigate("/login");
//       return;
//     }

//     // If seller has bikes already stored
//     if (seller.bikeListed && seller.bikeListed.length > 0) {
//       setBikes(seller.bikeListed);
//       console.log("✅ Loaded bikes:", seller.bikeListed);
//     }
//     setLoading(false);
//   }, [navigate]);

//   // Delete bike listing (not just bike)
// //   const handleDelete = async (listingId) => {
// //     if (!window.confirm("Are you sure you want to delete this bike?")) return;
// //     setDeletingId(listingId);

// //     try {
// //       const res = await axiosInstance.delete(`/seller/deletebike/${listingId}`, {
// //         withCredentials: true,
// //       });
// //       console.log("Deleted:", res.data);

// //       // Update state and localStorage
// //       const updatedBikes = bikes.filter((b) => b._id !== listingId);
// //       setBikes(updatedBikes);

// //       const updatedSeller = { ...seller, bikeListed: updatedBikes };
// //       localStorage.setItem("seller", JSON.stringify(updatedSeller));
// //     } catch (err) {
// //       console.error("❌ Failed to delete bike:", err.response?.data || err.message);
// //       alert("Error deleting bike. Try again.");
// //     } finally {
// //       setDeletingId(null);
// //     }
// //   };


// const handleDelete = async (bikeId) => {
//   if (!window.confirm("Are you sure you want to delete this bike?")) return;
//   setDeletingId(bikeId);

//   try {
//     const res = await axiosInstance.delete(`/seller/deletebike/${bikeId}`, {
//       withCredentials: true,
//     });
//     console.log("Deleted:", res.data);

//     // Remove deleted bike by its inner ID
//     const updatedBikes = bikes.filter((b) => b.bike._id !== bikeId);
//     setBikes(updatedBikes);

//     // Update localStorage
//     const updatedSeller = { ...seller, bikeListed: updatedBikes };
//     localStorage.setItem("seller", JSON.stringify(updatedSeller));
//   } catch (err) {
//     console.error("❌ Failed to delete bike:", err.response?.data || err.message);
//     alert("Error deleting bike. Try again.");
//   } finally {
//     setDeletingId(null);
//   }
// };



//   if (loading) {
//     return (
//       <div className="min-h-screen flex justify-center items-center text-xl">
//         Loading your bikes...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-200 p-6">
//       <div className="max-w-5xl mx-auto bg-base-100 shadow-xl rounded-lg p-6">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">My Listed Bikes</h1>
//           <button
//             className="btn btn-primary"
//             onClick={() => navigate("/seller/upload")}
//           >
//             + Upload New Bike
//           </button>
//         </div>

//         {bikes.length === 0 ? (
//           <div className="text-center text-gray-500 py-12">
//             <p>No bikes listed yet.</p>
//             <button
//               className="btn btn-primary mt-4"
//               onClick={() => navigate("/seller/upload")}
//             >
//               Upload a Bike
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {bikes.map((listing) => {
//               const bike = listing.bike || {}; // ✅ handle nested bike safely
//               return (
//                 <div
//                   key={listing._id || bike._id} // ✅ always unique key
//                   className="card bg-base-300 shadow-md rounded-lg overflow-hidden"
//                 >
//                   {/* Thumbnail */}
//                   {bike.photos && bike.photos.length > 0 ? (
//                     <figure className="h-40 bg-base-200 flex justify-center items-center overflow-hidden">
//                       <img
//                         src={bike.photos[0]}
//                         alt={bike.bikeName || "Bike"}
//                         className="object-cover w-full h-full"
//                       />
//                     </figure>
//                   ) : (
//                     <figure className="h-40 bg-base-200 flex justify-center items-center text-gray-500">
//                       <span>No Image</span>
//                     </figure>
//                   )}

//                   {/* Card content */}
//                   <div className="card-body p-4">
//                     <h2 className="card-title text-lg font-semibold">
//                       {bike.bikeName || "Unnamed Bike"}
//                     </h2>
//                     <p className="text-sm text-gray-600">
//                       Brand: {bike.brand || "Unknown"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Model: {bike.model || "-"}
//                     </p>
//                     <p className="text-sm text-gray-600">
//                       Engine: {bike.cc ? `${bike.cc} CC` : "-"}
//                     </p>

//                     <p className="mt-2">
//                       Status:
//                       <span
//                         className={`badge ml-2 ${
//                           listing.status === "Published"
//                             ? "badge-success"
//                             : "badge-warning"
//                         }`}
//                       >
//                         {listing.status}
//                       </span>
//                     </p>

//                     <div className="card-actions justify-end mt-4">
//                       <button
//                         className={`btn btn-error btn-sm ${
//                           deletingId === bike._id ? "loading" : ""
//                         }`}
//                         onClick={() => handleDelete(bike._id)}
//                         disabled={deletingId === bike._id}
//                       >
//                         {deletingId === bike._id ? "Deleting..." : "Delete"}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SellerBikeList;


import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const SellerBikeList = () => {
  const navigate = useNavigate();
  const [bikes, setBikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Load seller from localStorage
  const seller = JSON.parse(localStorage.getItem("seller") || "{}");

  useEffect(() => {
    if (!seller?._id) {
      navigate("/login");
      return;
    }

    if (seller.bikeListed && seller.bikeListed.length > 0) {
      setBikes(seller.bikeListed);
    }
    setLoading(false);
  }, [navigate]);

  const handleDelete = async (bikeId) => {
    if (!window.confirm("Are you sure you want to delete this bike?")) return;
    setDeletingId(bikeId);

    try {
      const res = await axiosInstance.delete(`/seller/deletebike/${bikeId}`, {
        withCredentials: true,
      });

      const updatedBikes = bikes.filter((b) => b.bike._id !== bikeId);
      setBikes(updatedBikes);

      const updatedSeller = { ...seller, bikeListed: updatedBikes };
      localStorage.setItem("seller", JSON.stringify(updatedSeller));
    } catch (err) {
      console.error("❌ Failed to delete bike:", err.response?.data || err.message);
      alert("Error deleting bike. Try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-xl font-semibold text-primary">
        Loading your bikes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200 p-6">
      <div className="max-w-6xl mx-auto bg-base-100 shadow-2xl rounded-2xl p-8 backdrop-blur-md border border-base-300">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-primary tracking-tight">
             My Listed Bikes
          </h1>
          <button
            className="btn btn-primary shadow-lg transition-transform hover:scale-105"
            onClick={() => navigate("/seller/upload")}
          >
            + Upload New Bike
          </button>
        </div>

        {bikes.length === 0 ? (
          <div className="text-center py-20 text-base-content/60">
            <p className="text-lg mb-4">No bikes listed yet.</p>
            <button
              className="btn btn-primary shadow-md hover:shadow-xl transition-transform hover:scale-105"
              onClick={() => navigate("/seller/upload")}
            >
              Upload a Bike
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {bikes.map((listing) => {
              const bike = listing.bike || {};
              return (
                <div
                  key={bike._id}
                  className="group card bg-base-300 shadow-lg hover:shadow-2xl rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Bike Image */}
                  {bike.photos && bike.photos.length > 0 ? (
                    <figure className="h-48 overflow-hidden bg-base-200">
                      <img
                        src={bike.photos[0]}
                        alt={bike.bikeName || "Bike"}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                    </figure>
                  ) : (
                    <figure className="h-48 flex justify-center items-center bg-base-200 text-gray-500">
                      <span>No Image</span>
                    </figure>
                  )}

                  {/* Card Body */}
                  <div className="card-body p-5">
                    <h2 className="card-title text-xl font-semibold mb-1">
                      {bike.bikeName || "Unnamed Bike"}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">
                      #{bike._id?.slice(-6)}
                    </p>

                    <div className="text-sm space-y-1">
                      <p>
                        <span className="font-medium">Brand:</span>{" "}
                        {bike.brand || "Unknown"}
                      </p>
                      <p>
                        <span className="font-medium">Model:</span>{" "}
                        {bike.model || "-"}
                      </p>
                      <p>
                        <span className="font-medium">Engine:</span>{" "}
                        {bike.cc ? `${bike.cc} CC` : "-"}
                      </p>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <span
                        className={`badge ${
                          listing.status === "Published"
                            ? "badge-success"
                            : "badge-warning"
                        } badge-outline`}
                      >
                        {listing.status}
                      </span>

                      <button
                        className={`btn btn-error btn-sm ${
                          deletingId === bike._id ? "loading" : ""
                        }`}
                        onClick={() => handleDelete(bike._id)}
                        disabled={deletingId === bike._id}
                      >
                        {deletingId === bike._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerBikeList;
