import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface DetailTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

type Transaction = {
  id: string | number;
  date: string;
  amount: number;
  type: "income" | "expense" | "transfer"; // tambahkan jika perlu
  category_id?: { name: string };
  note?: string;
};

const DetailTransactionModal: React.FC<DetailTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white rounded-3xl shadow-2xl p-8 w-full max-w-lg border border-gray-700"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition"
            aria-label="Close"
            onClick={onClose}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Modal Title */}
          <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 tracking-tight">
            Transaction Details
          </h2>

          {/* Transaction Details */}
          <div className="space-y-4">
            <DetailRow label="Transaction ID" value={transaction.id} />
            <DetailRow label="Date" value={transaction.date} />
            <DetailRow
              label="Amount"
              value={
                <span
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-400"
                      : transaction.type === "expense"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  Rp {transaction.amount.toLocaleString("id-ID")}
                </span>
              }
            />
            <DetailRow
              label="Type"
              value={
                <span
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-400"
                      : transaction.type === "expense"
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  {transaction.type.charAt(0).toUpperCase() +
                    transaction.type.slice(1)}
                </span>
              }
            />
            <DetailRow
              label="Category"
              value={
                <span className="font-medium text-blue-300">
                  {transaction.category_id?.name || "-"}
                </span>
              }
            />
            <DetailRow
              label="Note"
              value={
                <span className="text-gray-300">{transaction.note || "-"}</span>
              }
            />
          </div>

          {/* Footer */}
          <div className="mt-8 flex justify-end">
            <button
              className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Helper component for detail rows
  function DetailRow({
    label,
    value,
  }: {
    label: string;
    value: React.ReactNode;
  }) {
    return (
      <div className="flex justify-between items-center border-b border-gray-800 pb-2">
        <span className="text-gray-400 font-medium">{label}:</span>
        <span className="ml-4 text-right">{value}</span>
      </div>
    );
  }
};

export default DetailTransactionModal;
