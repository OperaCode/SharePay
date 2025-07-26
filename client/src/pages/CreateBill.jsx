import React, { useState } from "react";
import { useAccount } from "wagmi";
import axios from "axios";
import { Plus, Trash2, LogOut } from "lucide-react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const CreateBill = () => {
  const { address: connectedAddress } = useAccount();
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState([{ name: "", address: "" }]);
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("equal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: "", address: "" }]);
  };

  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const handleParticipantChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!connectedAddress) {
      setError("Please connect your wallet to create a bill.");
      return;
    }

    const payload = {
      title,
      totalAmount: parseFloat(amount),
      currency: "ETH",
      createdBy: connectedAddress,
      participants: participants.map((p) => ({
        walletAddress: p.address,
        hasPaid: false,
        txHash: null,
      })),
    };

    if (
      !payload.title ||
      !payload.totalAmount ||
      payload.participants.length < 1
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/bills/create-bill`, payload);

      console.log("Bill created:", res.data);
      

      setSuccess("Bill created successfully!");
      setTitle("");
      setParticipants([{ name: "", address: "" }]);
      setAmount("");
      setSplitType("equal");
    } catch (err) {
      console.error("Error creating bill:", err?.response?.data || err.message);
      setError("Failed to create bill. Please check your input or try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white p-6 relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 py-8 bg-gray-950/50 backdrop-blur-md">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
         
          SharePay
        </h1>
        <nav className="flex space-x-4 sm:space-x-6">
          <Link
            to="/home"
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-200"
          >
            Back to Dashboard
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1"
          >
            <LogOut size={15} />
            Exit
          </Link>
        </nav>
      </header>

      <div className="max-w-3xl mx-auto relative z-10 my-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Create New Bill
        </h2>
        {error && <p className="text-red-400 mb-4">{error}</p>}
        {success && <p className="text-green-400 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-300">Bill Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition"
              placeholder="e.g., Dinner at EthCafe"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Participants</label>
            {participants.map((p, idx) => (
              <div key={idx} className="flex space-x-2 mb-4 items-center">
                <input
                  type="text"
                  placeholder="Name"
                  value={p.name}
                  onChange={(e) =>
                    handleParticipantChange(idx, "name", e.target.value)
                  }
                  className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition"
                />
                <input
                  type="text"
                  placeholder="Wallet Address"
                  value={p.address}
                  onChange={(e) =>
                    handleParticipantChange(idx, "address", e.target.value)
                  }
                  className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition"
                  required
                />
                {participants.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(idx)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddParticipant}
              className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 hover:underline"
            >
              <Plus size={16} />
              <span>Add Participant</span>
            </button>
          </div>

          <div>
            <label className="block mb-2 text-gray-300">
              Total Amount (ETH)
            </label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition"
              placeholder="e.g., 0.5"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-300">Split Type</label>
            <select
              value={splitType}
              onChange={(e) => setSplitType(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition"
            >
              <option value="equal">Equal Split</option>
              <option value="custom" disabled>
                Custom Split (coming soon)
              </option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-semibold shadow-md hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? "Creating Bill..." : "Create Bill"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default CreateBill;
