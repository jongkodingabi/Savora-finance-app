import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import LineChart from "../../../components/ui/LineChart";
import StatsCard from "../../../components/ui/StatsCard";
import CircularProgress from "../../../components/ui/CircularProgress";
import { Pen } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import MoneyInputModal from "@/components/admin/MoneyInputModal";
import { toast, Toaster } from "react-hot-toast";

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [money, setMoney] = useState<number | null>(null);
  const [wallets, setWallets] = useState<any[]>([]);
  const { data: session, status } = useSession();
  const hasShownWelcome = useRef(false);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [totalGoals, setTotalGoals] = useState(0);
  const [chartData, setChartData] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  const fetchTransactionChartData = async () => {
    try {
      const res = await fetch("/api/transaction");
      const result = await res.json();

      if (res.ok) {
        const transactions = result.data;

        // Group transaksi berdasarkan tanggal
        const grouped = transactions.reduce((acc: any, trx: any) => {
          const date = new Date(trx.date).toISOString().split("T")[0];
          if (!acc[date]) acc[date] = 0;
          acc[date] += parseFloat(trx.amount);
          return acc;
        }, {});

        // Ubah ke format untuk chart: array of { date, total }
        const formatted = Object.entries(grouped).map(([date, total]) => ({
          date,
          total,
        }));

        // Optional: urutkan berdasarkan tanggal
        formatted.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );

        setChartData(formatted);
      } else {
        toast.error("Gagal memuat data chart transaksi");
      }
    } catch (err) {
      console.error("Chart error:", err);
      toast.error("Gagal memuat chart transaksi");
    }
  };

  const fetchTotalTransactions = async () => {
    try {
      const response = await fetch("/api/transaction", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTotalTransactions(data.data.length);
        setTransactions(data.data);
      }
    } catch (error) {
      console.error("Error fetching total transactions:", error);
      toast.error("Failed to fetch total transactions");
    }
  };

  const fetchTotalGoals = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTotalGoals(data.data.length);
        setGoals(data.data);
      }
    } catch (error) {
      console.error("Error fetching total goals:", error);
      toast.error("Failed to fetch total goals");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setTotalCategories(data.data.length);
        setCategories(data.data);
        console.log("Categories fetched:", data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchTotalTransactions();
      fetchCategories();
      fetchTotalGoals();
      fetchTransactionChartData();
    }
  }, [session?.user?.id]);

  // Notif login
  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user?.id &&
      !hasShownWelcome.current
    ) {
      toast.success("Welcome to your dashboard!", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#1e293b",
          color: "#f3f4f6",
        },
      });
      hasShownWelcome.current = true;
    }
  }, [status, session?.user?.id]);

  // handle save money
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
      // alert("Uang berhasil disimpan ke database!");
      await fetch("/api/update-status", {
        method: "POST", // supaya lebih aman (tidak bisa diakses sembarang)
      });
      toast.success("Succcessfully saving amount");

      fetchWallets(); // Fetch data again after successful insert
    }
  };

  // Move fetchWallets outside useEffect so it can be reused

  const fetchWallets = async () => {
    const res = await fetch("/api/wallets");

    const result = await res.json();

    if (res.ok) setWallets(result.data);
  };

  useEffect(() => {
    if (session?.user?.id) fetchWallets();
  }, [session?.user?.id]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 md:flex-row">
        <Toaster position="top-right" reverseOrder={false} />

        {/* Sidebar */}
        <Sidebar />
        {/* Main column */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <Header />
          {/* Main content */}
          <main className="flex-1 space-y-8 p-4 sm:p-8 md:p-10 lg:p-12 rounded-xl">
            {/* Row: Welcome & Stat Cards */}
            <section className="mb-6">
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome{session?.user?.name ? `, ${session.user.name}` : ""}!
              </h1>
              <p className="text-gray-400 mb-4">
                Here’s an overview of your financial dashboard.
              </p>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                  className="bg-gradient-to-tr from-purple-600 via-cyan-500 to-emerald-400 shadow-lg"
                  title="Total Amount"
                  value={
                    wallets && wallets.length > 0
                      ? wallets[0].value !== undefined
                        ? wallets[0].value
                        : wallets[0].amount !== undefined
                        ? wallets[0].amount.toLocaleString()
                        : wallets[0]
                      : "0"
                  }
                >
                  <Pen
                    className="cursor-pointer hover:text-white transition"
                    onClick={() => setIsModalOpen(true)}
                  />
                </StatsCard>
                <StatsCard
                  className="bg-gradient-to-tr from-pink-500 via-red-400 to-yellow-300 shadow-lg"
                  title="Total Transactions"
                  value={totalTransactions.toLocaleString()}
                  change="+ 2 %"
                  isPositive
                />
                <StatsCard
                  className="bg-gradient-to-tr from-blue-600 via-cyan-400 to-teal-300 shadow-lg"
                  title="Total Categories"
                  value={totalCategories.toLocaleString()}
                />
                <StatsCard
                  className="bg-gradient-to-tr from-emerald-500 via-green-400 to-lime-300 shadow-lg"
                  title="Total Goals"
                  value={totalGoals.toLocaleString()}
                />
              </div>
            </section>

            {/* Row: Chart & Circular Progress */}
            <section className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-gray-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Financial Overview
                </h2>
                <LineChart data={chartData} />
              </div>
              <div className="flex flex-col gap-6">
                <div className="rounded-xl bg-gray-800 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Your Goals
                  </h3>

                  {goals.length === 0 ? (
                    <p className="text-gray-400 text-sm">No goals found.</p>
                  ) : (
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                      {goals.map((goal) => (
                        <div
                          key={goal.id}
                          className="bg-gray-700 p-4 rounded-lg flex flex-col md:flex-row md:justify-between"
                        >
                          <div>
                            <p className="text-xl text-white font-semibold flex items-center gap-2">
                              <span>{goal.emoji}</span> {goal.title}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {goal.description}
                            </p>
                            <div className="text-sm text-gray-400 mt-1">
                              🎯 Target: Rp{" "}
                              {goal.targetAmount.toLocaleString("id-ID")}
                              <br />
                              💰 Progress: Rp{" "}
                              {goal.currentAmount.toLocaleString("id-ID")} (
                              {goal.percentage}%)
                            </div>
                          </div>

                          <div className="text-right mt-3 md:mt-0">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                goal.status === "completed"
                                  ? "bg-green-600 text-white"
                                  : "bg-yellow-500 text-black"
                              }`}
                            >
                              {goal.status}
                            </span>
                            <br />
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs mt-1 font-semibold ${
                                goal.priority === "high"
                                  ? "bg-red-500 text-white"
                                  : goal.priority === "medium"
                                  ? "bg-yellow-400 text-black"
                                  : "bg-green-400 text-black"
                              }`}
                            >
                              {goal.priority} priority
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Transaction List */}
                <div className="rounded-xl bg-gray-800 p-6">
                  <h3 className="mb-4 text-lg font-semibold text-white">
                    Transactions
                  </h3>

                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {transactions.length === 0 ? (
                      <p className="text-gray-400 text-sm">
                        No transactions yet.
                      </p>
                    ) : (
                      transactions.map((tx) => (
                        <div
                          key={tx.id}
                          className="flex flex-col md:flex-row md:justify-between bg-gray-700 p-3 rounded-lg"
                        >
                          <div>
                            <p className="text-white font-medium">
                              {tx.category_id.name}
                            </p>
                            <p className="text-gray-400 text-sm">{tx.note}</p>
                          </div>
                          <div className="text-right">
                            <p
                              className={`font-semibold ${
                                tx.type === "expense"
                                  ? "text-red-400"
                                  : tx.type === "income"
                                  ? "text-green-400"
                                  : "text-yellow-400"
                              }`}
                            >
                              {tx.type === "expense" ? "-" : "+"}
                              {tx.amount.toLocaleString("id-ID")}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(tx.date).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </section>

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
