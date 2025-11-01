// import React, { useState } from "react";
// import axios from "axios";
// import axiosInstance from "../../utils/axiosInstance";

// const UploadBikeForm = ({ onUploadSuccess }) => {
//   const [form, setForm] = useState({
//     brand: "",
//     bikeName: "",
//     model: "",
//     cc: "",
//     condition: "",
//   });
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle text/number/select inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file input
//   const handleFileChange = (e) => {
//     setPhotos(Array.from(e.target.files));
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // Append all text fields
//       for (const [key, value] of Object.entries(form)) {
//         formData.append(key, value);
//       }

//       // Append all photos
//       photos.forEach((file) => formData.append("photos", file));

//       console.log("➡️ Sending FormData:");
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       // ✅ DO NOT manually set Content-Type here
// const res = await axiosInstance.post(
//   "/seller/bikeupload", // ✅ Add leading slash
//   formData,
//   {
//     withCredentials: true, // ✅ include cookies
//     headers: {
//       "Content-Type": "multipart/form-data", // ✅ required for FormData
//     },
//   }
// );


//       console.log("✅ Upload successful:", res.data);

//       onUploadSuccess?.();
//       setForm({
//         brand: "",
//         bikeName: "",
//         model: "",
//         cc: "",
//         condition: "",
//       });
//       setPhotos([]);
//     } catch (err) {
//       console.error("❌ Upload failed:", err.response || err);
//       setError(err.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card bg-base-300 shadow-lg p-4">
//       <h2 className="text-xl font-semibold mb-3">Upload New Bike</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         <input
//           type="text"
//           name="brand"
//           placeholder="Brand"
//           className="input input-bordered w-full"
//           value={form.brand}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="bikeName"
//           placeholder="Bike Name"
//           className="input input-bordered w-full"
//           value={form.bikeName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="model"
//           placeholder="Model"
//           className="input input-bordered w-full"
//           value={form.model}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="cc"
//           placeholder="Engine CC"
//           className="input input-bordered w-full"
//           value={form.cc}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="condition"
//           className="select select-bordered w-full"
//           value={form.condition}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Condition</option>
//           <option value="GOOD">GOOD</option>
//           <option value="EXCELLENT">EXCELLENT</option>
//           <option value="SUPERB">SUPERB</option>
//         </select>

//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           className="file-input w-full"
//           onChange={handleFileChange}
//           required
//         />

//         {error && <p className="text-error text-sm">{error}</p>}

//         <button
//           type="submit"
//           className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
//           disabled={loading}
//         >
//           {loading ? "Uploading..." : "Upload Bike"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadBikeForm;




// import React, { useState } from "react";
// import axiosInstance from "../../utils/axiosInstance";

// const UploadBikeForm = ({ onUploadSuccess }) => {
//   const [form, setForm] = useState({
//     brand: "",
//     bikeName: "",
//     model: "",
//     cc: "",
//     condition: "",
//   });
//   const [photos, setPhotos] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle text/number/select inputs
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file input — allow appending new files
//   const handleFileChange = (e) => {
//     const newFiles = Array.from(e.target.files);
//     setPhotos((prev) => [...prev, ...newFiles]); // ✅ append, don’t replace
//     e.target.value = ""; // ✅ clear input so same file can be reselected later
//   };

//   // Remove selected photo
//   const removePhoto = (index) => {
//     setPhotos((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Submit the form
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const formData = new FormData();

//       // Append all text fields
//       for (const [key, value] of Object.entries(form)) {
//         formData.append(key, value);
//       }

//       // Append all photos
//       photos.forEach((file) => formData.append("photos", file));

//       console.log("➡️ Sending FormData:");
//       for (let pair of formData.entries()) {
//         console.log(pair[0], pair[1]);
//       }

//       const res = await axiosInstance.post("/seller/bikeupload", formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       console.log("✅ Upload successful:", res.data);
//       onUploadSuccess?.();

//       // Reset form
//       setForm({
//         brand: "",
//         bikeName: "",
//         model: "",
//         cc: "",
//         condition: "",
//       });
//       setPhotos([]);
//     } catch (err) {
//       console.error("❌ Upload failed:", err.response || err);
//       setError(err.response?.data?.message || "Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="card bg-base-300 shadow-lg p-4">
//       <h2 className="text-xl font-semibold mb-3">Upload New Bike</h2>

//       <form onSubmit={handleSubmit} className="space-y-3">
//         {/* Text Inputs */}
//         <input
//           type="text"
//           name="brand"
//           placeholder="Brand"
//           className="input input-bordered w-full"
//           value={form.brand}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="bikeName"
//           placeholder="Bike Name"
//           className="input input-bordered w-full"
//           value={form.bikeName}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="text"
//           name="model"
//           placeholder="Model"
//           className="input input-bordered w-full"
//           value={form.model}
//           onChange={handleChange}
//           required
//         />

//         <input
//           type="number"
//           name="cc"
//           placeholder="Engine CC"
//           className="input input-bordered w-full"
//           value={form.cc}
//           onChange={handleChange}
//           required
//         />

//         <select
//           name="condition"
//           className="select select-bordered w-full"
//           value={form.condition}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Condition</option>
//           <option value="GOOD">GOOD</option>
//           <option value="EXCELLENT">EXCELLENT</option>
//           <option value="SUPERB">SUPERB</option>
//         </select>

//         {/* File Input */}
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           className="file-input w-full"
//           onChange={handleFileChange}
//         />

//         {/* Photo Preview */}
//         {photos.length > 0 && (
//           <div className="flex flex-wrap gap-2">
//             {photos.map((file, idx) => (
//               <div key={idx} className="relative">
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={`preview-${idx}`}
//                   className="w-20 h-20 object-cover rounded"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removePhoto(idx)}
//                   className="absolute -top-2 -right-2 btn btn-xs btn-error rounded-full"
//                 >
//                   ✕
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {error && <p className="text-error text-sm">{error}</p>}

//         <button
//           type="submit"
//           className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
//           disabled={loading}
//         >
//           {loading ? "Uploading..." : "Upload Bike"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UploadBikeForm;


import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const UploadBikeForm = ({ onUploadSuccess }) => {
  const [form, setForm] = useState({
    brand: "",
    bikeName: "",
    model: "",
    cc: "",
    condition: "",
  });
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setPhotos((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      for (const [key, value] of Object.entries(form)) {
        formData.append(key, value);
      }
      photos.forEach((file) => formData.append("photos", file));

      const res = await axiosInstance.post("/seller/bikeupload", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ Upload successful:", res.data);
      onUploadSuccess?.();

      setForm({
        brand: "",
        bikeName: "",
        model: "",
        cc: "",
        condition: "",
      });
      setPhotos([]);
    } catch (err) {
      console.error("❌ Upload failed:", err.response || err);
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body space-y-6">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Upload New Bike
          </h2>
          <p className="text-center text-gray-500 text-sm">
            Fill out the details below and upload your bike photos.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ===== Form Inputs ===== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="brand"
                placeholder="Brand (e.g. Yamaha)"
                className="input input-bordered w-full"
                value={form.brand}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="bikeName"
                placeholder="Bike Name (e.g. R15 V3)"
                className="input input-bordered w-full"
                value={form.bikeName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="model"
                placeholder="Model Year (e.g. 2022)"
                className="input input-bordered w-full"
                value={form.model}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="cc"
                placeholder="Engine CC (e.g. 155)"
                className="input input-bordered w-full"
                value={form.cc}
                onChange={handleChange}
                required
              />
            </div>

            <select
              name="condition"
              className="select select-bordered w-full"
              value={form.condition}
              onChange={handleChange}
              required
            >
              <option value="">Select Condition</option>
              <option value="GOOD">Good</option>
              <option value="EXCELLENT">Excellent</option>
              <option value="SUPERB">Superb</option>
            </select>

            {/* ===== File Upload Section ===== */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Upload Photos</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="file-input file-input-bordered w-full"
                onChange={handleFileChange}
              />
            </div>

            {/* ===== Image Preview Grid ===== */}
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-2">
                {photos.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative group w-24 h-24 rounded-lg overflow-hidden shadow-sm"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`preview-${idx}`}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 btn btn-xs btn-circle btn-error opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {error && (
              <div className="alert alert-error py-2 text-sm">
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload Bike"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadBikeForm;
