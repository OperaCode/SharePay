const express = require("express");
const { createBill, getBill, updatePaymentStatus } = require("../controller/billController");
const router = express.Router();

router.post("/create-bill", createBill);
router.get("/:id", getBill);
router.put("/:id/pay", updatePaymentStatus);

module.exports = router;
