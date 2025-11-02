import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const sellerSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      maxlength: 50,
      index: true,
      trim: true
    },
    bikeListed: [
      {
        bike: {
          type: mongoose.Schema.ObjectId,
          ref: "Bike",
        },
        status: {
          type: String,
          enum: ["Published", "Purchase Initiated", "Purchased"],
          default: "Published",
        },
      },
    ],
    email: {
      type: String,
      required: [true, "Please write correct email"],
      unique: true,
      index: true,
      lowercase: true, 
      trim: true 
    },
    phoneNumber: {
      type: String,
      required: [true, "Please provide a valid phone number"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[0-9]{10}$/.test(v); // allows exactly 10 digits
        },
        message: (props) =>
          `${props.value} is not a valid 10-digit phone number!`,
      },
    },
    address: {
      addline1: { 
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true 
      },
      addline2: { 
        type: String, 
        lowercase: true, 
        trim: true 
      },
      city: { 
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true
      },
      state: { 
        type: String, 
        required: true, 
        lowercase: true, 
        trim: true 
      },
    },
    password: {
      type: String,
      required: [true, "Password Is Required"],
      min: 6,
    },
  },
  { timestamps: true }
);

sellerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

sellerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
sellerSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};
sellerSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Seller = mongoose.model("Seller", sellerSchema);
