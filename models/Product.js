import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  title:       { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  brand:       { type: String },
  stock:       { type: Number, default: 0 },
  category:    { type: String, index: true },
  images:      [{ url: String, alt: String }],
  rating: {
    count:   { type: Number, default: 0 },
    average: { type: Number, default: 0 }
  },
  createdAt:   { type: Date, default: Date.now }
});

export default mongoose.model("Product", productSchema);
