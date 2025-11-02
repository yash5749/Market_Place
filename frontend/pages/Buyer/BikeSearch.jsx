import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
const BikeSearch = () => {
  const [bikes, setBikes] = useState([]);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState("");
  const [minCC, setMinCC] = useState("");
  const [maxCC, setMaxCC] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedBike, setSelectedBike] = useState(null);
  const [leadData, setLeadData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    comments: "",
  });
  const [leadLoading, setLeadLoading] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const [leadError, setLeadError] = useState("");

  const fetchBikes = async () => {
    try {
      setLoading(true);
      const params = {
        search: search || undefined,
        condition: condition || undefined,
        minCC: minCC || undefined,
        maxCC: maxCC || undefined,
        sort: sort || undefined,
        page,
        limit: 9,
      };

      const { data } = await axiosInstance.get(
        "bikes/allbikes",
        { params }
      );
      const message = data?.message || {};
      setBikes(message.bikes || []);
      setTotalPages(message.totalPages || 1);
      console.log(message.bikes);
      
    } catch (err) {
      console.error("Error fetching bikes:", err);
      setBikes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBikes();
  }, [page, sort, condition]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchBikes();
  };

  const openLeadModal = (bike) => {
    setSelectedBike(bike);
    setLeadData({ name: "", phoneNumber: "", email: "", comments: "" });
    setLeadSuccess(false);
    setLeadError("");
    document.getElementById("lead_modal").showModal();
  };

  // const handleLeadSubmit = async (e) => {
  //   e.preventDefault();
  //   const { name, phoneNumber } = leadData;
  //   if (!name || !phoneNumber) {
  //     setLeadError("Name and Phone number are required.");
  //     if(phoneNumber.length != 10) {
  //       setLeadError("invalid Phone Number")
  //       return;
  //     }
  //     return;
  //   }

  //   try {
  //     setLeadLoading(true);
  //     setLeadError("");
  //     const payload = {
  //       ...leadData,
  //       intrestedIn: `${selectedBike._id}`,
  //       brand: `${selectedBike.brand}`,
  //       bikename: `${selectedBike.bikeName}`,
  //       model: `${selectedBike.model}`,
  //       cc: `${selectedBike.cc}`,

  //     };
  //     const { data } = await axiosInstance.post(
  //       "/bikes/lead",
  //       payload
  //     );
  //     if (data.success) {
  //       setLeadSuccess(true);
  //       setLeadData({ name: "", phoneNumber: "", email: "", comments: "" });
  //     } else {
  //       setLeadError("Failed to submit lead. Try again.");
  //     }
  //   } catch (err) {
  //     console.error("Lead creation error:", err);
  //     setLeadError("Something went wrong while creating lead.");
  //   } finally {
  //     setLeadLoading(false);
  //   }
  // };

  const handleLeadSubmit = async (e) => {
  e.preventDefault();

  const { name, phoneNumber, email } = leadData;

  // Trim to avoid accidental spaces
  const trimmedName = name.trim();
  const trimmedPhone = phoneNumber.trim();
  const trimmedEmail = email.trim();

  // Reset errors
  setLeadError("");

  // Basic field presence
  if (!trimmedName) {
    setLeadError("Name is required.");
    return;
  }

  if (!trimmedPhone) {
    setLeadError("Phone number is required.");
    return;
  }

  // ✅ Validate phone: exactly 10 digits
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(trimmedPhone)) {
    setLeadError("Invalid phone number. Must be 10 digits.");
    return;
  }

  // ✅ Validate email if provided
  if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    setLeadError("Invalid email format.");
    return;
  }

  // If passed all checks → continue
  try {
    setLeadLoading(true);
    const payload = {
      ...leadData,
      name: trimmedName,
      phoneNumber: trimmedPhone,
      email: trimmedEmail || undefined,
      interestedIn: selectedBike._id,
      brand: selectedBike.brand,
      bikename: selectedBike.bikeName,
      model: selectedBike.model,
      cc: selectedBike.cc,
    };

    const { data } = await axiosInstance.post("/bikes/lead", payload);

    if (data.success) {
      setLeadSuccess(true);
      setLeadData({ name: "", phoneNumber: "", email: "", comments: "" });
    } else {
      setLeadError("Failed to submit lead. Try again.");
    }
  } catch (err) {
    console.error("Lead creation error:", err);
    setLeadError("Something went wrong while creating lead.");
  } finally {
    setLeadLoading(false);
  }
};


  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* 🔍 Search Filters */}
      <div className="glass bg-base-200/60 backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-xl border border-base-300/30">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6"
        >
          {/* Search */}
          <div className="md:col-span-2">
            <label className="label-text font-semibold">Search</label>
            <div className="join w-full">
              <input
                type="text"
                placeholder="Brand / Model / Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input input-bordered join-item w-full"
              />
              <button type="submit" className="btn btn-primary join-item">
                🔎
              </button>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="label-text font-semibold">Condition</label>
            <select
              className="select select-bordered w-full"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">All</option>
              <option value="GOOD">Good</option>
              <option value="EXCELLENT">Excellent</option>
              <option value="SUPERB">Superb</option>
            </select>
          </div>

          {/* Min CC */}
          <div>
            <label className="label-text font-semibold">Min CC</label>
            <input
              type="number"
              value={minCC}
              onChange={(e) => setMinCC(e.target.value)}
              placeholder="100"
              className="input input-bordered w-full"
            />
          </div>

          {/* Max CC */}
          <div>
            <label className="label-text font-semibold">Max CC</label>
            <input
              type="number"
              value={maxCC}
              onChange={(e) => setMaxCC(e.target.value)}
              placeholder="1000"
              className="input input-bordered w-full"
            />
          </div>

          {/* Sort */}
          <div>
            <label className="label-text font-semibold">Sort</label>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="ccAsc">CC ↑</option>
              <option value="ccDesc">CC ↓</option>
            </select>
          </div>
        </form>
      </div>

      {/* 🏍️ Bikes Grid */}
      {loading ? (
        <div className="flex justify-center mt-16">
          <span className="loading loading-ring loading-lg text-primary"></span>
        </div>
      ) : bikes.length === 0 ? (
        <p className="text-center text-base-content/60 mt-12 italic">
          No bikes found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {bikes.map((bike) => (
            <div
              key={bike._id}
              className="card bg-base-100 border border-base-300/40 shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden"
            >
              {bike.photos?.[0] && (
                <figure className="relative h-52">
                  <img
                    src={bike.photos[0]}
                    alt={bike.bikeName}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-3 right-3 badge badge-accent text-xs shadow">
                    {bike.condition}
                  </div>
                </figure>
              )}
              <div className="card-body">
                <h2 className="card-title text-lg text-primary font-semibold">
                  {bike.brand} {bike.bikeName}
                </h2>
                <p className="text-sm text-base-content/70">
                  Model {bike.model} • {bike.cc} CC
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="btn btn-primary btn-sm btn-wide"
                    onClick={() => openLeadModal(bike)}
                  >
                    I’m Interested
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📄 Pagination */}
      <div className="flex justify-center items-center gap-6 mt-14">
        <button
          className="btn btn-outline btn-primary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          « Prev
        </button>
        <span className="text-sm opacity-70">
          Page {page} / {totalPages}
        </span>
        <button
          className="btn btn-outline btn-primary"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next »
        </button>
      </div>

      {/* 💬 Interested Modal */}
      <dialog id="lead_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100/95 backdrop-blur-xl border border-base-300/30 shadow-2xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          {leadSuccess ? (
            <div className="text-center space-y-4 py-6">
              <h3 className="text-lg font-bold text-success">
                Lead submitted successfully!
              </h3>
              <p>Our team will contact you soon.</p>
              <form method="dialog">
                <button className="btn btn-primary w-full mt-4">Close</button>
              </form>
            </div>
          ) : (
            <>
              <h3 className="font-bold text-lg mb-4">
                Interested in {selectedBike?.brand} {selectedBike?.bikeName}
              </h3>

              <form onSubmit={handleLeadSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full"
                  value={leadData.name}
                  onChange={(e) =>
                    setLeadData({ ...leadData, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                  value={leadData.phoneNumber}
                  onChange={(e) =>
                    setLeadData({ ...leadData, phoneNumber: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email (optional)"
                  className="input input-bordered w-full"
                  value={leadData.email}
                  onChange={(e) =>
                    setLeadData({ ...leadData, email: e.target.value })
                  }
                />
                <textarea
                  placeholder="Comments (optional)"
                  className="textarea textarea-bordered w-full"
                  value={leadData.comments}
                  onChange={(e) =>
                    setLeadData({ ...leadData, comments: e.target.value })
                  }
                ></textarea>

                {leadError && (
                  <p className="text-error text-sm">{leadError}</p>
                )}

                <button
                  type="submit"
                  className={`btn btn-primary w-full ${
                    leadLoading ? "loading" : ""
                  }`}
                  disabled={leadLoading}
                >
                  {leadLoading ? "Submitting..." : "Submit Lead"}
                </button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default BikeSearch;
