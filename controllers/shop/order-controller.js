const mongoose = require("mongoose");
const Inquiry = require("../../models/Order.js"); // Assuming the model is correctly imported

// Get all inquiries
const getInquiry = async (req, res) => {
  try {
    const inquiries = await Inquiry.find();
    res.status(200).json(inquiries);
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Create a new Inquiry
const createInquiry = async (req, res) => {
  try {
    // Validate request body
    const { cartItems, address } = req.body;

    // Check for cartItems validity
    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res
        .status(400)
        .json({
          message: "cartItems is required and must be a non-empty array.",
        });
    }

    // Check for address validity
    if (!address || !Array.isArray(address) || address.length === 0) {
      return res
        .status(400)
        .json({ message: "address must be a non-empty array." });
    }

    // Extracting the first address object
    const addressData = address[0]; // Get the first item from the address array

    // Validate required fields in the address object
    if (
      !addressData ||
      !addressData.address ||
      !addressData.city ||
      !addressData.phone
    ) {
      return res
        .status(400)
        .json({ message: "address must include address, city, and phone." });
    }

    // Create a new Inquiry instance
    const newInquiry = new Inquiry({
      cartItems,
      address: addressData, // Use the extracted address object
    });

    const savedInquiry = await newInquiry.save();
    res.status(201).json(savedInquiry);
  } catch (error) {
    console.error("Error creating Inquiry:", error);
    res
      .status(400)
      .json({ message: "Error creating Inquiry", error: error.message });
  }
};

module.exports = { getInquiry, createInquiry };
