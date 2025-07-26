const Bill = require("../models/bill");

// Create a new bill
const createBill = async (req, res) => {
  try {
    const { title, totalAmount, currency, participants, createdBy } = req.body;
    console.log(req.body);

    const splitAmount = totalAmount / participants.length;

    const newBill = new Bill({
      title,
      totalAmount,
      currency,
      createdBy,
      participants: participants.map((p) => ({
        walletAddress: p.walletAddress,
        amount:splitAmount,
        hasPaid: false,
        txHash: null,
      })),
    });

    await newBill.save();
    console.log(newBill);
    res.status(201).json({ success: true, bill: newBill });
  } catch (err) {
    console.error("Error creating bill:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all bills for a wallet
const getBills = async (req, res) => {
  try {
    const { address } = req.params;
    const bills = await Bill.find({
      $or: [{ creator: address }, { "participants.address": address }],
    }).sort({ createdAt: -1 });

    res.json({ success: true, bills });
  } catch (err) {
    console.error("Error fetching bills:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get a single bill
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill)
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });
    res.json({ success: true, bill });
  } catch (err) {
    console.error("Error fetching bill:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Mark participant as paid
const updatePaymentStatus = async (req, res) => {
  try {
    const { billId } = req.params;
    const { address, txHash } = req.body;

    const bill = await Bill.findById(billId);
    if (!bill)
      return res
        .status(404)
        .json({ success: false, message: "Bill not found" });

    const participant = bill.participants.find(
      (p) => p.address.toLowerCase() === address.toLowerCase()
    );
    if (!participant)
      return res
        .status(400)
        .json({ success: false, message: "Not a participant" });

    participant.hasPaid = true;
    participant.txHash = txHash;

    await bill.save();
    res.json({ success: true, message: "Payment recorded", bill });
  } catch (err) {
    console.error("Error marking payment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  createBill,
  getBills,
  getBillById,
  updatePaymentStatus,
};
