import mongoose from "mongoose";

const apartmentSchema = mongoose.Schema({
  // Name/title of the apartment
  name: {
    type: String,
  },
  // Description of the apartment
  description: {
    type: String,
    required: true,
  },
  // Main image URL of the apartment
  img: {
    type: String,
    required: true,
  },
  // Category reference (e.g., villa, studio)
  category: {
    type: mongoose.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  // Advertiser who posted this apartment
  advertiser: {
    type: mongoose.Types.ObjectId,
    ref: "Advertiser",
    required: true,
  },
  // City in which the apartment is located
  city: {
    type: mongoose.Types.ObjectId,
    ref: "City",
    required: true,
  },
  // Full address (street and number)
  address: {
    type: String,
    required: true,
  },
  // Number of beds in the apartment
  numBeds: {
    type: Number,
    required: true,
  },
  // Price per night
  price: {
    type: Number,
    required: true,
  },
  // Optional list of additional features (e.g., WiFi, parking)
  additives: [
    {
      type: String,
    },
  ],
}, { timestamps: true });

export default mongoose.model("Apartment", apartmentSchema);
