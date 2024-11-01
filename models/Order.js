const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    cartItems: [
      {
        productId: { type: String, required: true },
        img: { type: String },
        title: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    address: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
      pincode: { type: String },
      notes: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inquiry", InquirySchema);
