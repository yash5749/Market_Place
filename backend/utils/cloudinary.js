import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("File uploaded to Cloudinary:", result.url);

    //remove from local after upload
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);

     if (!result?.url) {
      throw new ApiError(500, "Cloudinary upload failed — no URL returned");
    }
    

    return result;
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
};

export { uploadOnCloudinary };
