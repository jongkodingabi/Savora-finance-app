import { useState } from "react";

export default function MoneyInputModal({ isOpen, onClose, onSave }: any) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSave(Number(amount));
    setAmount("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-transparent bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 text-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Input Your Total Amount</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Contoh: 100000"
            required
          />
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
