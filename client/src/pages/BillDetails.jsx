// src/pages/BillDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAccount } from "wagmi";

const BillDetails = () => {
  const { id } = useParams();
  const { address } = useAccount(); // wallet address
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.get(`/api/bills/${id}`);
        setBill(res.data);
      } catch (error) {
        console.error("Failed to load bill:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBill();
  }, [id]);

  const handlePayment = async () => {
    if (!address) return alert("Connect your wallet first");
    setIsPaying(true);

    try {
      // TODO: Integrate Wagmi+Ethers payment logic here
      console.log("Initiate payment for:", bill._id);

      // Simulate API call or smart contract call
      await axios.post(`/api/bills/${bill._id}/pay`, {
        payer: address,
      });

      alert("Payment successful!");
      window.location.reload();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Payment failed. See console for details.");
    } finally {
      setIsPaying(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!bill) return <div className="text-center py-8 text-red-500">Bill not found</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">{bill.title}</h2>
      <p className="text-gray-400 mb-2">Created by: {bill.creator}</p>
      <p className="mb-6">
        Total Amount: <span className="font-semibold">{bill.amount} ETH</span>
      </p>

      <h3 className="text-lg font-semibold mb-2">Participants</h3>
      <ul className="bg-gray-800 rounded-lg divide-y divide-gray-700">
        {bill.participants.map((p, idx) => (
          <li key={idx} className="p-4 flex justify-between">
            <span>{p.address}</span>
            <span className={p.paid ? "text-green-400" : "text-red-400"}>
              {p.paid ? "✅ Paid" : "❌ Unpaid"}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-end">
        {!bill.isPaid && (
          <button
            disabled={isPaying}
            className={`${
              isPaying ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
            } text-white font-medium px-6 py-2 rounded-lg`}
            onClick={handlePayment}
          >
            {isPaying ? "Processing..." : "Pay Now"}
          </button>
        )}
      </div>
    </div>
  );
};

export default BillDetails;
