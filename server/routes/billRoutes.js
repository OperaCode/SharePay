const express = require("express");
const { createBill,getBills, getBillById, updatePaymentStatus } = require("../controller/billController");
const router = express.Router();

router.post("/create-bill", createBill);
router.get("/", getBills);
router.get("/:billId", getBillById);
router.put("/:billId/pay", updatePaymentStatus);

module.exports = router;
