import React from "react";
import { Link } from "react-router-dom";

const mockBills = [
  {
    id: "abc123",
    title: "Hackathon Hotel",
    total: "0.6 ETH",
    status: "In Progress",
    participants: 3,
  },
  {
    id: "xyz789",
    title: "NFT Mint Group",
    total: "120 USDC",
    status: "Completed",
    participants: 5,
  },
];

const Home = () => {
  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to Split3 👋</h1>
        <p className="text-gray-400">Manage and track all your shared Web3 expenses in one place.</p>
      </header>

      {/* Action Panel */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-4">
          <Link
            to="/create"
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg font-semibold transition"
          >
            ➕ Create New Bill
          </Link>
          <Link
            to="/wallet"
            className="bg-gray-800 hover:bg-gray-700 px-5 py-3 rounded-lg transition"
          >
            🧾 My Wallet & Payments
          </Link>
        </div>
      </section>

      {/* Recent Bills */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">🗂️ Recent Bills</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {mockBills.map((bill) => (
            <div
              key={bill.id}
              className="border border-gray-700 p-4 rounded-xl bg-gray-800 shadow-md"
            >
              <h3 className="text-xl font-semibold mb-1">{bill.title}</h3>
              <p className="text-gray-400 text-sm mb-2">
                Total: <span className="text-white">{bill.total}</span> · Participants:{" "}
                {bill.participants}
              </p>
              <p
                className={`inline-block px-3 py-1 rounded-full text-xs ${
                  bill.status === "Completed"
                    ? "bg-green-600"
                    : "bg-yellow-600"
                }`}
              >
                {bill.status}
              </p>
              <Link
                to={`/bill/${bill.id}`}
                className="block mt-4 text-sm text-blue-400 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Coming Soon / Notifications */}
      <section className="mt-12 border-t border-gray-700 pt-8">
        <h2 className="text-xl font-semibold mb-2">🔔 Notifications (Coming Soon)</h2>
        <p className="text-gray-500">You’ll get notified when a friend pays or when a bill is due.</p>
      </section>
    </div>
  );
};

export default Home;
