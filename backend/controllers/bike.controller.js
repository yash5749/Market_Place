import nodemailer from "nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { Bike } from "../models/bike.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Seller } from "../models/seller.model.js";
import { Lead } from "../models/lead.model.js";

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const uploadbike = asyncHandler(async (req, res) => {
  
  console.log("reaches upload bike");
  
    const { brand, bikeName, model, cc, condition } = req.body;
    console.log("➡️ REQ.BODY:", req.body);
    console.log("➡️ REQ.FILES:", req.files);

  // Validate body
  if (!brand || !bikeName || !model || !cc || !condition) {
    throw new ApiError(400, "All fields are required");
  }

  // Validate files

  console.log("REQ.FILES:", req.files);

  const bikePhotos = req.files?.photos;
  if (!bikePhotos || bikePhotos.length === 0) {
    throw new ApiError(400, "At least one bike photo is required");
  }

  // Upload each file to Cloudinary
  const uploadedPhotos = [];
  for (const file of bikePhotos) {
    const pic = await uploadOnCloudinary(file.path);
    if (pic?.url) uploadedPhotos.push(pic.url);
  }

  if (uploadedPhotos.length === 0) {
    throw new ApiError(400, "Failed to upload any bike photos");
  }

  // Create bike
  const bike = await Bike.create({
    brand,
    bikeName,
    model,
    cc,
    condition,
    photos: uploadedPhotos,
    owner: req.seller?._id, // assuming verifyJwt adds user to req
  });

  if (!bike) {
    throw new ApiError(500, "Error saving bike data to database");
  }

  await Seller.findByIdAndUpdate(
    req.seller._id,
    { $push: { bikeListed: { bike: bike._id, status: "Published" } } },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, "Bike uploaded successfully", bike));

});

const deleteBike = asyncHandler(async (req, res) => {
  const bikeId = req.params.id;
  const sellerId = req.seller._id;

  const bike = await Bike.findById(bikeId);
  if (!bike) {
    throw new ApiError(404, "Bike not found");
  }

  if (bike.owner.toString() !== sellerId.toString()) {
    throw new ApiError(403, "You are not authorized to delete this bike");
  }

  await bike.deleteOne();

  await Seller.findByIdAndUpdate(
    sellerId,
    {
      $pull: { bikeListed: { bike: bike._id } },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Bike deleted successfully"));
});

const getAllBikes = asyncHandler(async (req, res) => {
  const {
    search, // optional search string
    condition, // optional filter: GOOD, EXCELLENT, SUPERB
    minCC, // optional minimum CC filter
    maxCC, // optional maximum CC filter
    sort, // optional sort: newest, ccAsc, ccDesc
    page, // pagination page
    limit, // pagination limit
  } = req.query;

  // 1️⃣ Build filter object
  const filter = {};

  // Search by brand, bikeName, or model
  if (search && search.trim() !== "") {
    filter.$or = [
      { brand: { $regex: search, $options: "i" } },
      { bikeName: { $regex: search, $options: "i" } },
      { model: { $regex: search, $options: "i" } },
    ];
  }

  // Filter by condition
  if (
    condition &&
    ["GOOD", "EXCELLENT", "SUPERB"].includes(condition.toUpperCase())
  ) {
    filter.condition = condition.toUpperCase();
  }

  // Filter by CC range
  if (minCC || maxCC) {
    filter.cc = {};
    if (minCC) filter.cc.$gte = parseInt(minCC);
    if (maxCC) filter.cc.$lte = parseInt(maxCC);
  }

  // 2️⃣ Pagination defaults
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  // 3️⃣ Sorting
  let sortOption = { createdAt: -1 }; // default newest first
  if (sort === "ccAsc") sortOption = { cc: 1 };
  if (sort === "ccDesc") sortOption = { cc: -1 };

  // 4️⃣ Query database
  const bikes = await Bike.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(limitNumber);

  const totalBikes = await Bike.countDocuments(filter);
  const totalPages = Math.ceil(totalBikes / limitNumber);

  // 5️⃣ Send response
  return res.status(200).json(
    new ApiResponse(200, "Bikes fetched successfully", {
      bikes,
      page: pageNumber,
      totalPages,
      totalBikes,
    })
  );
});

const createLead = asyncHandler(async (req, res) => {
  const { name, phoneNumber, email, intrestedIn, comments,brand,bikename,model,cc } = req.body;
  if (!name || !phoneNumber || !intrestedIn) {
    throw new ApiError(400, "All fields are required");
  }
  const lead = await Lead.create({
    name,
    phoneNumber,
    intrestedIn,
    brand,
    bikename,
    model,
    cc,
    email: email || "",
    comments: comments || "",
  });

  // send email to your team
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: "New Lead Created",
    text: `Lead Details:
    Name: ${name}
    Phone: ${phoneNumber}
    Interested In: ${intrestedIn}
    Brand :${brand}
    Bike Name: ${bikename}
    Model ${model}
    CC: ${cc}
    Email: ${email}
    Comments: ${comments}`,
  });

  if(email){
    await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Thank You For Contacting Market Place",
    text: `Thank you for showing intrest in ${brand}, ${bikename}, ${model}, ${cc} CC.
            Our executive will soon contact to you.
            For more information you can contact 9999999999
            Regards Yash`,
  });
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Lead Created Successfully", lead));
});

export { uploadbike, getAllBikes, deleteBike, createLead };
