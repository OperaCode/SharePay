import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { LogOut, Plus } from "lucide-react";
import { motion } from "framer-motion";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Home = () => {
  const { address, isConnected } = useAccount();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(`${BASE_URL}/bills`);
        const data = Array.isArray(res.data) ? res.data : res.data.bills || [];
        setBills(res.data.bills);
      } catch (err) {
        console.error("Failed to fetch bills", err);
        setError("Failed to load bills. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (isConnected) fetchBills();
  }, [isConnected]);

  const cardVariants = {
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

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
            to="/about"
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-200"
          >
            Bills Log
          </Link>
          <Link
            to="/create"
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-200"
          >
            <h1 >New Bill</h1>
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1"
          >
            <LogOut size={15}/>
            Exit
          </Link>
        </nav>
      </header>


      <section className="m my-24 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Welcome to Split3 👋
        </h1>
        <p className="text-gray-400 text-sm sm:text-base">
          {isConnected
            ? `Manage and track all your shared Web3 expenses, ${address?.slice(
                0,
                6
              )}...${address?.slice(-4)}`
            : "Please connect your wallet to get started."}
          {isConnected && (
            <span className="ml-2 inline-block w-2 h-2 bg-green-500 rounded-full "></span>
          )}
        </p>
      </section>

      <section className="mb-8 px-4 relative z-10">
        <div className="flex flex-wrap gap-4 justify-end items-center">
          <ConnectButton />
          <Link
            to="/create"
            className="relative inline-flex items-center px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg font-semibold text-white hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-md hover:shadow-cyan-500/50"
          >
            <Plus className="mr-2" />
            Create New Bill
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/30 to-blue-400/30 animate-pulse" />
          </Link>
        </div>
      </section>

      <section className="mb-10 relative z-10">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-200">
          🗂️ Recent Bills
        </h2>

        {!isConnected ? (
          <p className="text-gray-400 text-center">
            Please{" "}
            <span className="text-cyan-400 underline cursor-pointer">
              connect your wallet
            </span>{" "}
            to view your bills.
          </p>
        ) : loading ? (
          <p className="text-gray-400 text-center">Loading bills...</p>
        ) : error ? (
          <p className="text-red-400 text-center">{error}</p>
        ) : bills.length === 0 ? (
          <p className="text-gray-500 italic text-center">
            No recent bills found. Create one to get started.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bills.map((bill) => (
              <motion.div
                key={bill._id || bill.id}
                className="border border-gray-800 bg-gray-900 rounded-lg p-4 hover:shadow-lg transition-colors"
                variants={cardVariants}
                whileHover="hover"
              >
                <Link to={`/bill/${bill._id || bill.id}`} className="block">
                  <h2 className="text-xl font-semibold text-cyan-300 mb-2">
                    {bill.title}
                  </h2>
                  <p className="text-gray-400">
                    Total:{" "}
                    {bill.totalAmount
                      ? `$${bill.totalAmount} ${bill.currency}`
                      : "N/A"}
                  </p>
                  <p className="text-gray-500">
                    Currency: {bill.currency || "ETH"}
                  </p>
                  <p className="text-gray-500">
                    Participants:{" "}
                    {Array.isArray(bill.participants)
                      ? bill.participants
                          .map(
                            (p) =>
                              p.name ||
                              p.walletAddress?.slice(0, 6) + "..." ||
                              "Unknown"
                          )
                          .join(", ")
                      : "N/A"}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12 border-t border-gray-800 pt-8 relative z-10">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 text-gray-200">
          🔔 Notifications (Coming Soon)
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          You’ll get notified when a friend pays or when a bill is due.
        </p>
      </section>
    </div>
  );
};

export default Home;
