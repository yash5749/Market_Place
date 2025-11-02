import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    match: [/^\d{10}$/, "Invalid phone number"]
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
  },
  brand: {
    type: String,
    trim: true,
    lowercase: true
  },
  bikename: {
    type: String,
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  cc: {
    type: Number,
    min: 50, 
  },
  interestedIn: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
  },
  comments: {
    type: String,
    trim: true,
    maxlength: 250
  }
}, { timestamps: true });

export const Lead = mongoose.model("Lead", leadSchema);
