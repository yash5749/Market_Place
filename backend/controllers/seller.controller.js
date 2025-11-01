import { asyncHandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Seller } from "../models/seller.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const test = asyncHandler(async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  res.status(200).json({ message: "ok" });
});

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const seller = await Seller.findById(userId);
    const accessToken = seller.generateAccessToken();
    const refreshToken = seller.generateRefreshToken();

    seller.refreshToken = refreshToken;
    await seller.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const register = asyncHandler(async (req, res) => {
  //check for mail
  //check is it allready regester with mail
  //check for password
  //check for phone number
  //generate access and refresh token

  const { fullName, email, phoneNumber, address, password } = req.body;
  console.log(fullName, email, phoneNumber, address, password);
  if (!fullName || !email || !phoneNumber || !address || !password) {
    throw new ApiError(400, "All Fields Are Required");
  }

  const userAlreadyExist = await Seller.findOne({
    $or: [{ email }, { phoneNumber }],
  });
  if (userAlreadyExist) {
    throw new ApiError(400, "User Already Regestered");
  }

  const seller = await Seller.create({
    fullName,
    email,
    phoneNumber,
    address,
    password,
  });

  const cretedSeller = await Seller.findById(seller.id).select(
    "-password  -refreshtoken"
  );

  if (!cretedSeller) {
    throw new ApiError(500, "Something went wrong while registring the user");
  }

  res
    .status(201)
    .json(new ApiResponse(200, cretedSeller, "User registerd successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email) {
    throw new ApiError(401, "Email is Required");
  }
  if (!password) {
    throw new ApiError(401, "Password is Required");
  }

  const seller = await Seller.findOne({ email });
  if (!seller) {
    throw new ApiError(402, "User Not Found");
  }

  const isPasswordValid = await seller.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(402, "Incorrect Password Please try Again");
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    seller._id
  );

  const loggedInSeller = await Seller.findById(seller._id)
  .populate({
    path: "bikeListed.bike",
    model: "Bike",
  })
  .select("-password -refreshToken")
  .lean();


  const options = {
    httpOnly: true,
    secure: true,
     sameSite: "None",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInSeller,
          accessToken,
          refreshToken,
        },
        "user logged in successfully"
      )
    );
});

const logout = asyncHandler (async (req, res) => {
     await Seller.findByIdAndUpdate(
          req.seller._id,
          {
               $set: {
                    refreshToken : "",
               }
          },
          {
               new : true
          }
     )
     const options = {
          httpOnly : true,
          secure : true,
           sameSite: "None",
     }
     return res.status(200).
     clearCookie("accessToken",options).
     clearCookie("refreshToken",options).
     json(
          new ApiResponse(200, {} , "User Logged Out ")
     )
})

const resfreshAcessToken = asyncHandler(async(req,res) => {
     const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
      if(!incomingRefreshToken){
          throw new ApiError(401,"Unauthorise Request")
     }
     const decodedToken =  jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
     )
     if(!decodedToken){
          throw new ApiError(404,"Token not decoded")
     }
     const seller = await Seller.findById(decodedToken?._id)

     if(!seller){
          throw new ApiError(401,"Invalid refresh token")
     }
     if(incomingRefreshToken !== seller?.refreshToken){
          throw new ApiError(401,"Unauthorized token")
     }
     const options= {
          secure : true,
          httpOnly:true,
          sameSite: "None",
     }

     const {accessToken,newRefreshToken} = await generateAccessAndRefreshToken(seller._id)
     
     return res
     .status(200)
     .cookies("accessToken",accessToken)
     .cookies("refreshToken",newRefreshToken)
     .json(
          200,
          {accessToken,newRefreshToken}
     )

})

const changeCurrentPassword = asyncHandler(async(req,res) => {

     const {oldPassword,newPassword} = req.body
     const seller = await Seller.findById(req.seller?._id)
     const isPasswordCorrect= await seller.isPasswordCorrect(oldPassword)

     if(!isPasswordCorrect){
          throw new ApiError(404,"wrong password")
     }
     seller.password = newPassword
     await user.save({validateBeforeSave : false})

     return res
     .status(200)
     .json( new ApiResponse(201, {},"Password Chnaged Successfully"))

})

const currentSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id)
    .populate({
      path: "bikeListed.bike",
      model: "Bike",
    })
    .select("-password -refreshToken")
    .lean();

  if (!seller) throw new ApiError(404, "Seller not found");

  return res
    .status(200)
    .json(new ApiResponse(200, seller, "current user fetched successfully"));
});

export { register, login, logout, resfreshAcessToken, changeCurrentPassword, currentSeller };
