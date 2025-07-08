import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { on } from "events";

type CreateModalProps = {
  isClose: () => void;
  handleSubmit: (name: string, type: string) => void;
};

const CreateModalOpen = ({ isClose, handleSubmit }: CreateModalProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("expense");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setType("expense");
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-zinc-900/50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-all"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700 relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <button
              onClick={isClose}
              className="absolute top-3 right-4 text-gray-400 hover:text-white transition-colors duration-200 text-2xl"
              aria-label="Tutup"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-white mb-6 text-center tracking-wide">
              Add Category
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(name, type);
                setName("");
                setType("expense");
              }}
              className="space-y-5"
            >
              <div>
                <label className="text-sm text-gray-300 block mb-2 font-medium">
                  Category Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="Contoh: Transportasi"
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-2 font-medium">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={isClose}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 text-white rounded-lg font-semibold shadow transition"
                >
                  Save
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default CreateModalOpen;
