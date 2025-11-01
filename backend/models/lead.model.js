import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
    },
    brand:{
        type:String,
    },
    bikename: {
        type:String,
    },
    model: {
        tyep: String
    },
    cc: {
        type:Number
    },

    intrestedIn: {
        type: mongoose.Schema.ObjectId,
        ref:"Bike"
    },
    comments : {
        type: String,
        max: 250
    }
}, {timestamps: true})

export const Lead = mongoose.model("Lead", leadSchema);