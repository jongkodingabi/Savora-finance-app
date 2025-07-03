"use client";

import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import {
  Pen,
  Users,
  DollarSign,
  TrendingUp,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  BanknoteIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MoneyInputModal from "../../../components/admin/MoneyInputModal";
import { toast, Toaster } from "react-hot-toast";

// Sample data for the table
const tableData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15",
    amount: "$2,500",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-14",
    amount: "$1,800",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "Moderator",
    status: "Inactive",
    lastLogin: "2024-01-10",
    amount: "$3,200",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    lastLogin: "2024-01-16",
    amount: "$950",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
    lastLogin: "2024-01-15",
    amount: "$4,100",
  },
];

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState<number | null>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const { data: session } = useSession();

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
      toast.success("Successfully saving amount");
      fetchWallets();
    }
  };

  const fetchWallets = async () => {
    const res = await fetch("/api/wallets");
    const result = await res.json();
    if (res.ok) setWallets(result.data);
  };

  useEffect(() => {
    if (session?.user?.id) fetchWallets();
  }, [session?.user?.id]);

  // Calculate total amount from wallets
  const totalAmount = wallets.reduce(
    (sum, wallet) => sum + (wallet.value || wallet.amount || 0),
    0
  );

  return (
    <>
      <Head>
        <title>Dashboard</title>
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
            <section className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 - Total Revenue */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                  className="mt-4 bg-blue-500/30 hover:bg-blue-500/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Edit Amount
                </button>
              </div>

              {/* Card 2 - Total Users */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">
                      Total Transaction
                    </p>
                    <p className="text-3xl font-bold mt-2">
                      {tableData.length.toLocaleString()}
                    </p>
                    <p className="text-purple-200 text-sm mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +8.2% from last month
                    </p>
                  </div>
                  <div className="bg-purple-500/30 p-3 rounded-lg">
                    <BanknoteIcon className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-4 bg-purple-500/30 px-4 py-2 rounded-lg text-sm font-medium">
                  {tableData.filter((user) => user.status === "Active").length}{" "}
                  Active Users
                </div>
              </div>

              {/* Card 3 - Growth Rate */}
              <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-100 text-sm font-medium">
                      Growth Rate
                    </p>
                    <p className="text-3xl font-bold mt-2">24.8%</p>
                    <p className="text-emerald-200 text-sm mt-1 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +3.1% from last month
                    </p>
                  </div>
                  <div className="bg-emerald-500/30 p-3 rounded-lg">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
                <div className="mt-4 bg-emerald-500/30 px-4 py-2 rounded-lg text-sm font-medium">
                  Excellent Performance
                </div>
              </div>
            </section>

            {/* Dark Modern Table Section */}
            <section className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-white">
                      Transactions
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                      Create and manage your transactions
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Search transaction..."
                      className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium transition-colors duration-200">
                      Add Transaction
                      <Pen className="w-4 h-4 inline-block ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden sm:table-cell">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden md:table-cell">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider hidden lg:table-cell">
                        Last Login
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {tableData.map((user, index) => (
                      <tr
                        key={user.id}
                        className="hover:bg-gray-800/30 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-medium">
                                {user.name.charAt(0)}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-gray-400">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === "Admin"
                                ? "bg-red-900/50 text-red-300 border border-red-800"
                                : user.role === "Moderator"
                                ? "bg-yellow-900/50 text-yellow-300 border border-yellow-800"
                                : "bg-green-900/50 text-green-300 border border-green-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.status === "Active"
                                ? "bg-green-900/50 text-green-300 border border-green-800"
                                : "bg-gray-900/50 text-gray-300 border border-gray-700"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 hidden lg:table-cell">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {user.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <button className="text-blue-400 hover:text-blue-300 p-1 rounded transition-colors duration-200">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-400 hover:text-green-300 p-1 rounded transition-colors duration-200">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-red-400 hover:text-red-300 p-1 rounded transition-colors duration-200">
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <button className="text-gray-400 hover:text-gray-300 p-1 rounded transition-colors duration-200">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="px-6 py-4 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-sm text-gray-400">
                  Showing 1 to {tableData.length} of {tableData.length} results
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    Previous
                  </button>
                  <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded border border-blue-600">
                    1
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200">
                    2
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors duration-200">
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
    </>
  );
}
