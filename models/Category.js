const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    image: String,
    title: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    //   description: String,
    //   category: String,
    //   brand: String,
    //   price: Number,
    //   salePrice: Number,
    //   totalStock: Number,
    //   averageReview: Number,
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;
