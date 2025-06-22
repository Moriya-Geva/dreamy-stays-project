import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
  // Name of the category (e.g., Villa, Suite)
  nameC: {
    type: String,
    required: true,
  },
  // Array of apartments under this category
  apartmentArr: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Apartment",
    },
  ],
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);
