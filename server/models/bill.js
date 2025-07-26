const mongoose = require("mongoose");

const participantSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
   amount: { type: Number, required: true },
  hasPaid: { type: Boolean, default: false },
  txHash: { type: String, default: null },
});

const billSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  currency: { type: String, default: "ETH" },
  createdBy: { type: String, required: true },
  participants: { type: [participantSchema], required: true },
  status: { type: String, enum: ["Open", "Closed"], default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
