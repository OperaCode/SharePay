// src/pages/Landing.jsx
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Welcome to <span className="text-blue-500">Split3</span>
      </h1>
      <p className="text-xl md:text-2xl text-center max-w-xl mb-8">
        Effortless ETH bill splitting for Web3 squads. Create shared bills,
        track payments, and pay directly from your wallet.
      </p>
      <Link to="/home" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition">
        Split a Bill
      </Link>
    </div>
  );
};

export default Landing;
