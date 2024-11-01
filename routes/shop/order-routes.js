const express = require("express");
const {
  getInquiry,
  createInquiry,
} = require("../../controllers/shop/order-controller.js");

const router = express.Router();

router.get("/get", getInquiry);
router.post("/create", createInquiry);

module.exports = router;
