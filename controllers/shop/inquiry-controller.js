// const Inquiry = require("../models/Inquiry.js");

// // Get all inquiries
// const getInquiry = async (req, res) => {
//   try {
//     const inquiries = await Inquiry.find();
//     res.status(200).json(inquiries);
//   } catch (error) {
//     console.error("Error fetching inquiries:", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

// // Create a new Inquiry
// const createInquiry = async (req, res) => {
//   try {
//     // Validate request body
//     const { cartItems, address } = req.body;
//     if (
//       !cartItems ||
//       !Array.isArray(cartItems) ||
//       cartItems.length === 0 ||
//       !address
//     ) {
//       return res
//         .status(400)
//         .json({ message: "Both cartItems and address are required." });
//     }

//     const newInquiry = new Inquiry(req.body);
//     const savedInquiry = await newInquiry.save();
//     res.status(201).json(savedInquiry);
//   } catch (error) {
//     console.error("Error creating Inquiry:", error);
//     res
//       .status(400)
//       .json({ message: "Error creating Inquiry", error: error.message });
//   }
// };

// module.exports = { getInquiry, createInquiry };
