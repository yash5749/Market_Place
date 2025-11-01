import jwt from "jsonwebtoken";
import { Seller } from "../models/seller.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken;
  if (!token) {
    throw new ApiError(401, "Unauthorized Access");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const seller = await Seller.findById(decodedToken?._id)
      .populate({
        path: "bikeListed.bike",
        model: "Bike",
      })
      .select("-password -refreshToken");

    if (!seller) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.seller = seller;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new ApiError(401, "Unauthorized request");
  }
});

export { verifyJwt };
