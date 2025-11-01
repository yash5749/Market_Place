// import jwt from "jsonwebtoken";
// import { Seller } from "../models/seller.model.js";
// import { asyncHandler } from "../utils/asynchandler.js";
// import { ApiError } from "../utils/ApiError.js";

// const verifyJwt = asyncHandler(async (req, res, next) => {
//   const token = req.cookies?.accessToken;

//   if (authHeader && authHeader.startsWith("Bearer ")) {
//     token = authHeader.split(" ")[1]; // Extract Bearer token
//   } else if (req.cookies?.accessToken) {
//     token = req.cookies.accessToken; // Fallback for cookie-based login
//   }

//   if (!token) {
//     throw new ApiError(401, "Unauthorized Access");
//   }

//   try {
//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const seller = await Seller.findById(decodedToken?._id)
//       .populate({
//         path: "bikeListed.bike",
//         model: "Bike",
//       })
//       .select("-password -refreshToken");

//     if (!seller) {
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     req.seller = seller;
//     next();
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     throw new ApiError(401, "Unauthorized request");
//   }
// });

// export { verifyJwt };


import jwt from "jsonwebtoken";
import { Seller } from "../models/seller.model.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJwt = asyncHandler(async (req, res, next) => {
  let token; // ✅ use let since we’ll reassign

  const authHeader = req.headers.authorization; // ✅ define before using

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1]; // ✅ extract Bearer token
  } else if (req.cookies?.accessToken) {
    token = req.cookies.accessToken; // ✅ fallback for cookie-based login
  }

  if (!token) {
    throw new ApiError(401, "Unauthorized Access - Token missing");
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
      throw new ApiError(401, "Invalid Access Token - Seller not found");
    }

    req.seller = seller;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    throw new ApiError(401, "Unauthorized request - Invalid token");
  }
});

export { verifyJwt };
