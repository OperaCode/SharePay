import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BillDetails = () => {
  const { billId } = useParams();
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bills/detail/${billId}`);
        setBill(res.data.bill);
      } catch (err) {
        console.error("Error fetching bill:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [billId]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!bill) return <div className="p-6">Bill not found.</div>;

  const allPaid = bill.participants.every((p) => p.hasPaid === true);
  const status = allPaid ? "Closed" : "Open";

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-2">{bill.title}</h2>
      <p className="text-gray-700">Total: {bill.totalAmount} {bill.currency}</p>
      <p className="text-gray-700">Created by: {bill.createdBy}</p>
      <p className="text-sm mt-2">
        Status: <span className={`font-semibold ${status === "Closed" ? "text-green-600" : "text-orange-500"}`}>{status}</span>
      </p>

      <h3 className="text-xl font-semibold mt-6 mb-2">Participants</h3>
      <div className="space-y-4">
        {bill.participants.map((participant, index) => (
          <div
            key={index}
            className={`p-4 border rounded ${participant.hasPaid ? "border-green-400" : "border-red-300"}`}
          >
            <p className="font-mono">{participant.walletAddress}</p>
            <p>Status: 
              <span className={`ml-2 font-semibold ${participant.hasPaid ? "text-green-600" : "text-red-600"}`}>
                {participant.hasPaid ? "Paid" : "Pending"}
              </span>
            </p>
            {participant.hasPaid && (
              <p className="text-sm text-gray-500">TxHash: {participant.txHash}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillDetails;
