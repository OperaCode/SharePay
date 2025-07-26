import axios from "axios";
import React, { useState } from "react";


const BASE_URL= import.meta.env.VITE_BASE_URL

const CreateBill = () => {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState([{ name: "", address: "" }]);
  const [amount, setAmount] = useState("");
  const [splitType, setSplitType] = useState("equal");

  const handleAddParticipant = () => {
    setParticipants([...participants, { name: "", address: "" }]);
  };

  const handleParticipantChange = (index, field, value) => {
    const updated = [...participants];
    updated[index][field] = value;
    setParticipants(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      participants,
      amount,
      splitType,
    };

    console.log("Creating bill:", payload);
    // Call your backend API here
    try {
        res = axios.post(`${BASE_URL}/bills/create-bill`,payload)
        console.log(res)
    } catch (error) {
        
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Create New Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Bill Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            placeholder="e.g., Dinner at EthCafe"
            required
          />
        </div>

        <div>
          <label className="block mb-2">Participants</label>
          {participants.map((p, idx) => (
            <div key={idx} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Name"
                value={p.name}
                onChange={(e) => handleParticipantChange(idx, "name", e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
              />
              <input
                type="text"
                placeholder="Wallet Address"
                value={p.address}
                onChange={(e) => handleParticipantChange(idx, "address", e.target.value)}
                className="flex-1 p-2 rounded bg-gray-800 border border-gray-600"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddParticipant}
            className="text-sm text-blue-400 hover:underline"
          >
            + Add Participant
          </button>
        </div>

        <div>
          <label className="block mb-1">Total Amount (ETH)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            placeholder="e.g., 0.5"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Split Type</label>
          <select
            value={splitType}
            onChange={(e) => setSplitType(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          >
            <option value="equal">Equal Split</option>
            <option value="custom">Custom Split</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-semibold"
        >
          Create Bill
        </button>
      </form>
    </div>
  );
};

export default CreateBill;
