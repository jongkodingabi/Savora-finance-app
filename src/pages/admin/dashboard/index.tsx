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
                  title="Revenue"
                  value="326.6 K"
                  change="+ 2 %"
                  isPositive
                />
                <StatsCard
                  className="bg-gradient-to-tr from-blue-600 via-cyan-400 to-teal-300 shadow-lg"
                  title="Pageviews / visit"
                  value="4.20"
                />
                <StatsCard
                  className="bg-gradient-to-tr from-emerald-500 via-green-400 to-lime-300 shadow-lg"
                  title="Avg. Time"
                  value="00:03:27"
                />
              </div>
            </section>

            {/* Row: Chart & Circular Progress */}
            <section className="grid gap-8 grid-cols-1 lg:grid-cols-3">
              <div className="lg:col-span-2 bg-gray-900 rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-white mb-4">
                  Financial Overview
                </h2>
                <LineChart />
              </div>
              <div className="flex flex-col gap-6">
                <CircularProgress
                  title="Traffic Sources"
                  percentage={12}
                  color="#06B6D4"
                />
                <CircularProgress
                  title="Share of voice"
                  percentage={39}
                  color="#8B5CF6"
                />
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
