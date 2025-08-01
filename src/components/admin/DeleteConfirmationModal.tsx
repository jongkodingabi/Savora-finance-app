import { Trash } from "lucide-react";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

export default function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}: DeleteConfirmationModalProps) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-zinc-900/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-900 text-white rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-800"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <div className="flex items-center mb-4">
            <div className="bg-red-600 rounded-full p-2 mr-3">
              <Trash className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-bold">Delete Confirmation</h2>
          </div>
          <p className="text-base mb-8 text-zinc-300">
            Are you sure you want to delete{" "}
            <span className="font-bold text-red-400">
              {itemName ?? "this item"}
            </span>
            ?<br />
            <span className="text-sm text-zinc-400">
              This action cannot be undone.
            </span>
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-lg bg-zinc-700 hover:bg-zinc-600 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors font-semibold flex items-center gap-2 shadow"
            >
              Delete
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
