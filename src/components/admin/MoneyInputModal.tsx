import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-zinc-950/50 backdrop-blur-md flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl shadow-2xl p-10 w-full max-w-md border border-gray-700 relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Close"
            type="button"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center tracking-tight">
            Input Your Total Amount
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium mb-2 text-gray-300"
              >
                Amount
              </label>
              <input
                id="amount"
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                placeholder="e.g. 100000"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-800 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 px-6 py-2 rounded-lg font-semibold shadow-lg transition"
              >
                Save
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
