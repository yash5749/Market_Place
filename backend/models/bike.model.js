import mongoose, { Schema } from "mongoose";

const bikeSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    bikeName: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    cc: {
      type: Number,
      required: true,
      min: [50, "CC should be realistic (>=50)"],
    },
    condition: {
      type: String,
      required: true,
      enum: ["GOOD", "EXCELLENT", "SUPERB"],
    },
    photos: {
      type: [String], // array of photo URLs
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
    },
  },
  { timestamps: true }
);

export const Bike = mongoose.model("Bike", bikeSchema);
