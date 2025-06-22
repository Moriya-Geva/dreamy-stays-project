import mongoose from "mongoose";

const advertiserSchema = mongoose.Schema({
  // Email address of the advertiser
  email: {
    type: String,
    required: true,
  },
  // Encrypted password
  password: {
    type: String,
    required: true,
  },
  // Primary phone number
  phone: {
    type: String,
    required: true,
    maxLength: 10,
  },
  // Optional secondary phone number
  morePhone: {
    type: String,
    maxLength: 10,
  },
  // Array of apartments posted by this advertiser
  apartmentArr: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Apartment",
      required: true,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Advertiser", advertiserSchema);
