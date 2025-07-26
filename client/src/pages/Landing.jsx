import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
      },
    },
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950 text-white">
      {/* Dynamic Gradient Background with Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/30 via-transparent to-transparent" />
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-purple-400/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 bg-gray-950/50 backdrop-blur-md">
        <Link to="/" className="text-4xl p-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-600">
          Split3
        </Link>
        <nav className="flex space-x-4 sm:space-x-6">
          {/* <Link to="/features" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200">
            Features
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200">
            About
          </Link> */}
          <Link to="/home" className="text-gray-300 hover:text-cyan-300 transition-colors duration-200 font-bold">
            Explore Split3
          </Link>
        </nav>
      </header>

      <motion.div
        className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
          variants={itemVariants}
        >
          Welcome to <span className="text-cyan-300">Split3</span>
        </motion.h1>
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-center max-w-3xl mb-10 text-gray-300 leading-relaxed font-medium"
          variants={itemVariants}
        >
          Seamlessly split ETH bills with your Web3 crew/community. Create shared bills, track payments, and settle directly from your crypto wallet.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            to="/home"
            className="relative inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50"
          >
            <span className="relative z-10">Split a Bill</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30 animate-pulse" />
          </Link>
        </motion.div>
        <motion.div
          className="mt-12 text-sm text-gray-400 text-center"
          variants={itemVariants}
        >
          Powered by Web3 | Connect with MetaMask, WalletConnect, and more
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;