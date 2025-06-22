import mongoose from "mongoose";

const citySchema = mongoose.Schema({
  // Name of the city
  nameC: {
    type: String,
    required: true,
  },
  // Array of apartments located in this city
  apartmentArr: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Apartment",
    },
  ],
}, { timestamps: true });

export default mongoose.model("City", citySchema);
