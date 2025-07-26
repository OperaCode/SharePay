import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useSendTransaction, useAccount } from "wagmi";
import { parseEther } from "viem";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const BillDetails = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

//   const { address: currentUserAddress } = useAccount();
  const { address: currentUserAddress, isConnected } = useAccount();
  const {
  data: txData,
  sendTransaction,
  isPending,
  error: txError,
} = useSendTransaction();


  //   fetch bills
  useEffect(() => {
    const fetchBill = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${BASE_URL}/bills/${billId}`);
        setBill(res.data.bill);
      } catch (err) {
        console.error("Error fetching bill:", err);
        setError("Failed to load bill. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId]);

  const handlePay = async (amount) => {
  if (!sendTransaction || !currentUserAddress) return;

  try {
    sendTransaction(
      {
        to: bill.createdBy,
        value: parseEther(amount.toString()),
      },
      {
        onSuccess: async (tx) => {
          console.log("Transaction sent:", tx.hash);

          await axios.post(`${BASE_URL}/bills/${billId}/pay`, {
            walletAddress: currentUserAddress,
            txHash: tx.hash,
          });

          const res = await axios.get(`${BASE_URL}/bills/${billId}`);
          setBill(res.data.bill);
        },
        onError: (err) => {
          console.error("Transaction error:", err);
        },
      }
    );
  } catch (err) {
    console.error("Unexpected payment error:", err);
  }
};


  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
        <p className="text-gray-400 animate-pulse">Loading...</p>
      </div>
    );
  if (!bill || error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950">
        <p className="text-red-400">{error || "Bill not found"}</p>
      </div>
    );

  const allPaid = bill.participants.every((p) => p.hasPaid === true);
  const status = allPaid ? "Closed" : "Open";
  const currentDate = new Date().toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white p-6 relative overflow-hidden">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 py-8 bg-gray-950/50 backdrop-blur-md">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          {" "}
          Split3
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

      <div className="max-w-2xl mx-auto mt-28 relative z-10">
        <motion.h2
          className="text-2xl sm:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {bill.title}
        </motion.h2>
        <div className="space-y-2 mb-6">
          <p className="text-gray-400 text-sm">
            Created by: {bill.createdBy.slice(0, 6)}...
            {bill.createdBy.slice(-4)}
          </p>
          <p className="text-gray-400 text-sm">
            Total:{" "}
            <span className="text-cyan-300 font-semibold">
              {bill.totalAmount} {bill.currency}
            </span>
          </p>
          <p className="text-gray-400 text-sm">
            Last Updated: {currentDate} WAT
          </p>
        </div>

        <div className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-opacity-20 transition-all duration-300 hover:bg-opacity-30">
            <span
              className={
                status === "Closed"
                  ? "text-green-400 bg-green-500/20"
                  : "text-orange-400 bg-orange-500/20"
              }
            >
              {status}
            </span>
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-200">
          Participants
        </h3>
        <div className="space-y-4">
          {bill.participants.map((participant, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg border flex items-center justify-between ${
                participant.hasPaid
                  ? "border-green-400 bg-green-900/30"
                  : "border-red-300 bg-red-900/30"
              } shadow-md hover:shadow-lg transition-all duration-300`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {/* bill details */}
              <div>
                <p className="font-mono text-gray-300 mb-1 ">
                  {participant.walletAddress.slice(0, 6)}...
                  {participant.walletAddress.slice(-4)}
                </p>
                <p className="flex items-center">
                  Status:
                  <span
                    className={`ml-2 font-semibold ${
                      participant.hasPaid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {participant.hasPaid ? "Paid" : "Pending"}
                  </span>
                </p>
                <p className="flex items-center">
                  Amount owed:
                  <span
                    className={`ml-2 font-semibold ${
                      participant.hasPaid ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {participant.amount}
                  </span>
                </p>
                {participant.hasPaid && participant.txHash && (
                  <p className="text-sm text-gray-500 mt-1">
                    TxHash: {participant.txHash.slice(0, 10)}...
                    {participant.txHash.slice(-8)}{" "}
                    <a
                      href={`https://etherscan.io/tx/${participant.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline"
                    >
                      View
                    </a>
                  </p>
                )}
              </div>

              {/* CTA- Pay Now */}
              <div className="">
                {participant.walletAddress.toLowerCase() ===
                  currentUserAddress?.toLowerCase() && (
                  <button
                    className={`px-3 py-1 rounded ${
                      !currentUserAddress || participant.hasPaid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 text-white"
                    }`}
                    onClick={() => {
                      if (currentUserAddress && !participant.hasPaid) {
                        handlePay(participant.amount);
                      }
                    }}
                    disabled={!currentUserAddress || participant.hasPaid}
                  >
                    {participant.hasPaid
                      ? "Paid"
                      : !currentUserAddress
                      ? "Connect Wallet"
                      : "Pay Now"}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillDetails;
