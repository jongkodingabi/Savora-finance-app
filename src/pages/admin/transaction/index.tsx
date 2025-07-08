"use client";

import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import {
  Pen,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BanknoteIcon,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MoneyInputModal from "../../../components/admin/MoneyInputModal";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import DeleteModalConfirmation from "@/components/admin/DeleteConfirmationModal";
import DetailTransactionModal from "@/components/admin/DetailTransactionModal";

// Sample data for the table
// const tableData = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     role: "Admin",
//     status: "Active",
//     lastLogin: "2024-01-15",
//     amount: "$2,500",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     role: "User",
//     status: "Active",
//     lastLogin: "2024-01-14",
//     amount: "$1,800",
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     email: "mike@example.com",
//     role: "Moderator",
//     status: "Inactive",
//     lastLogin: "2024-01-10",
//     amount: "$3,200",
//   },
//   {
//     id: 4,
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     role: "User",
//     status: "Active",
//     lastLogin: "2024-01-16",
//     amount: "$950",
//   },
//   {
//     id: 5,
//     name: "David Brown",
//     email: "david@example.com",
//     role: "Admin",
//     status: "Active",
//     lastLogin: "2024-01-15",
//     amount: "$4,100",
//   },
// ];
type Category = { id: number; name: any; type: any }; // Adjust fields as needed
type Transaction = {
  id: number;
  amount: number;
  type: string;
  payment_method?: string;
  date: string;
  category_id?: { name: string };
  note?: string;
};

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState<number | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]); // Adjust type as needed
  const [wallets, setWallets] = useState<any[]>([]);
  const { data: session } = useSession();
  const [totalCategories, setTotalCategories] = useState<Category[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [transactionIdToDelete, setTransactionIdToDelete] =
    useState<Transaction | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust as needed
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [statusFilter, setStatusFilter] = useState("All");

  // Transaction Filter

  const openDetailModal = (transaction: Transaction) => {
    // Set the transaction data to be displayed in the detail modal
    // This could be done by setting a state variable
    // setSelectedTransaction(transaction);
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  const fetchCategories = async () => {
    if (!session?.user?.id) return;

    const response = await fetch("/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTotalCategories(data.data);
    } else {
      console.error("Failed to fetch categories");
    }
  };

  // fetch transactions
  const fetchTransactions = async () => {
    if (!session?.user?.id) return;

    const response = await fetch("/api/transaction", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setTransactions(data.data);
    } else {
      console.error("Failed to fetch transactions:", response.statusText);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTransactions();
  }, [session?.user?.id]);

  const countCategory = totalCategories.length; // Assuming total categories is the length of tableData
  const countTransaction = transactions.length; // Assuming transactions is the length of tableData
  const incomeCategories = totalCategories.filter(
    (category) => category.type === "income"
  );
  const expenseCategories = totalCategories.filter(
    (category) => category.type === "expense"
  );
  const transferCategories = totalCategories.filter(
    (category) => category.type === "transfer"
  );

  const handleSaveMoney = async (value: number) => {
    setMoney(value);
    const response = await fetch("/api/wallets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: value }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Gagal simpan data:", result.error);
      alert(`Insert error: ${result.error}`);
    } else {
      await fetch("/api/update-status", {
        method: "POST", // supaya lebih aman (tidak bisa diakses sembarang)
      });
      toast.success("Successfully saving amount");
      fetchWallets();
    }
  };

  const fetchWallets = async () => {
    const res = await fetch("/api/wallets");
    const result = await res.json();
    if (res.ok) setWallets(result.data);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    setTransactionIdToDelete(transaction);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTransaction = async () => {
    const response = await fetch("/api/transaction", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: transactionIdToDelete?.id }),
    });

    const result = await response.json();
    if (!response.ok) {
      console.error("Failed to delete transaction:", result.error);
      toast.error(`Delete error: ${result.error}`);
    } else {
      toast.success("Transaction deleted successfully");
      setIsDeleteModalOpen(false);
      fetchTransactions();
    }
  };

  useEffect(() => {
    if (session?.user?.id) fetchWallets();
  }, [session?.user?.id]);

  // Calculate total amount from wallets
  const totalAmount = wallets.reduce(
    (sum, wallet) => sum + (wallet.value || wallet.amount || 0),
    0
  );

  const filteredTransactions = transactions
    .filter((t) => {
      // filter by status/type (income, expense, transfer)
      if (statusFilter !== "All") {
        return t.type === statusFilter;
      }
      return true;
    })
    .filter(
      (t) =>
        t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category_id?.name
          ?.toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        t.payment_method?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.amount.toString().includes(searchQuery)
    );

  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return (
    <>
      <Head>
        <title>Transaction - Dashboard</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-950 md:flex-row">
        <Toaster position="top-right" reverseOrder={false} />

        {/* Sidebar */}
        <Sidebar />

        {/* Main column */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <Header />

          {/* Main content */}
          <main className="flex-1 space-y-8 p-4 sm:p-6 md:p-8 lg:p-10">
            {/* 3 Cards Section */}
            <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 - Total Revenue */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">
                      Total Amount
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {totalAmount.toLocaleString()}
                    </p>
                    <p className="text-blue-200 text-sm mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="bg-blue-500/30 p-3 rounded-lg">
                    <DollarSign className="w-8 h-8" />
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="mt-4 bg-blue-500/30 hover:bg-blue-500/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center w-full sm:w-auto"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Edit Amount
                </button>
              </div>

              {/* Card 2 - Total Users */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Total Categories
                    </p>
                    <p className="text-3xl font-bold mt-2">{countCategory}</p>
                    <p className="text-purple-200 text-sm mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8.2% from last month
                    </p>
                  </div>
                  <div className="bg-purple-500/30 p-3 rounded-lg">
                    <BanknoteIcon className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto">
                  {incomeCategories.length} income, {expenseCategories.length}{" "}
                  expense, {transferCategories.length} transfer
                </div>
              </div>

              {/* Card 3 - Growth Rate */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col justify-between md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">
                      Total Transactions
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {countTransaction}
                    </p>
                    <p className="text-emerald-200 text-sm mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +3.1% from last month
                    </p>
                  </div>
                  <div className="bg-emerald-500/30 p-3 rounded-lg">
                    <Wallet className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-4 bg-emerald-500/30 px-4 py-2 rounded-lg text-sm font-medium w-full sm:w-auto">
                  {transactions.length} transactions recorded
                </div>
              </div>
            </section>

            {/* Dark Modern Table Section */}
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-x-auto">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Transactions
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Create and manage your transactions
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    <input
                      type="text"
                      placeholder="Search transaction..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                    />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto"
                    >
                      <option value="All">All Type</option>
                      <option value="expense">Expense</option>
                      <option value="income">Income</option>
                      <option value="transfer">Transfer</option>
                    </select>

                    <Link
                      href="/admin/transaction/add"
                      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200 flex items-center justify-center w-full sm:w-auto"
                    >
                      Add Transaction
                      <Pen className="w-4 h-4 inline-block ml-1" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                        Type
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                        Category
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                        Method
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {paginatedTransactions.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="hover:bg-gray-800/30 transition-colors duration-200"
                      >
                        {/* Amount */}
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-24 flex items-center justify-center text-white font-semibold text-base">
                              {transaction.amount.toLocaleString()}
                            </div>
                          </div>
                        </td>
                        {/* Type */}
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                              ${
                                transaction.type === "income"
                                  ? "bg-green-900/50 text-green-300 border border-green-800"
                                  : transaction.type === "expense"
                                  ? "bg-red-900/50 text-red-300 border border-red-800"
                                  : transaction.type === "transfer"
                                  ? "bg-blue-900/50 text-blue-300 border border-blue-800"
                                  : "bg-gray-800/50 text-gray-300 border border-gray-700"
                              }`}
                          >
                            {transaction.type}
                          </span>
                        </td>
                        {/* Category */}
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              transaction.category_id?.name
                                ? "bg-gray-900/50 text-gray-300 border border-gray-700"
                                : "bg-gray-900/50 text-gray-300 border border-gray-700"
                            }`}
                          >
                            {transaction.category_id?.name || "Uncategorized"}
                          </span>
                        </td>
                        {/* Method */}
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                          {transaction.payment_method || "Cash"}
                        </td>
                        {/* Date */}
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {new Date(transaction.date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                            }
                          )}
                        </td>
                        {/* Actions */}
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() =>
                                openDetailModal({
                                  id: transaction.id,
                                  amount: transaction.amount,
                                  type: transaction.type,
                                  payment_method: transaction.payment_method,
                                  date: transaction.date,
                                  category_id: transaction.category_id,
                                  note: transaction.note,
                                })
                              }
                              className="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors duration-200"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteTransaction({
                                  id: transaction.id,
                                  amount: transaction.amount,
                                  type: transaction.type,
                                  payment_method: transaction.payment_method,
                                  date: transaction.date,
                                  category_id: transaction.category_id,
                                  note: transaction.note,
                                })
                              }
                              className="text-red-400 hover:text-red-300 p-1 rounded transition-colors duration-200"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {transactions.length === 0 && (
                  <div className="text-center text-gray-400 py-8">
                    No transactions found.
                  </div>
                )}
              </div>

              {/* Table Footer */}
              <div className="px-4 sm:px-6 py-4 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-400">
                  Showing 1 to {transactions.length} of {transactions.length}{" "}
                  results
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Previous
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-3 py-1 text-sm rounded border ${
                        currentPage === index + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </section>

            {/* Money Input Modal */}
            <MoneyInputModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSaveMoney}
            />
          </main>
        </div>
      </div>
      <DeleteModalConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteTransaction}
        itemName="transaction"
      />

      {/* Detail Transaction Modal */}
      {isDetailModalOpen && selectedTransaction && (
        <DetailTransactionModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          transaction={selectedTransaction as any}
        />
      )}
    </>
  );
}
