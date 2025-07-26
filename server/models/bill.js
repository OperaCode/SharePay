const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  walletAddress: String,
  hasPaid: { type: Boolean, default: false },
  txHash: String,
});

const billSchema = new mongoose.Schema({
  title: String,
  totalAmount: Number,
  currency: { type: String, default: "ETH" },
  createdBy: String,
  participants: [participantSchema],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
