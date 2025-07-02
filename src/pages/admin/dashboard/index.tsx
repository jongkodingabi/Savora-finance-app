import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import LineChart from "../../../components/ui/LineChart";
import StatsCard from "../../../components/ui/StatsCard";
import CircularProgress from "../../../components/ui/CircularProgress";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import MoneyInputModal from "@/components/admin/MoneyInputModal";
import { toast, Toaster } from "react-hot-toast";

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

      <div className="flex flex-col min-h-screen bg-gray-950 md:flex-row">
        <Toaster position="top-right" reverseOrder={false} />

        {/* Sidebar */}
        <Sidebar />
        {/* Main column */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <Header />
          {/* Main content */}

          <main className="flex-1 space-y-6 p-4 sm:p-6 md:p-8 lg:p-10 rounded-xl">
            {/* 1 – Row: chart & stat cards */}

            <section className="grid gap-6 grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <LineChart />
              </div>

              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:col-span-5">
                {wallets && wallets.length > 0 ? (
                  wallets.map((wallet: any) => (
                    <StatsCard
                      key={
                        wallet.id || wallet._id || wallet.value || Math.random()
                      }
                      className="bg-gradient-to-tr from-purple-600 via-cyan-500 to-emerald-400"
                      title="Total Amount"
                      value={
                        wallet.value !== undefined
                          ? wallet.value
                          : wallet.amount !== undefined
                          ? wallet.amount.toLocaleString()
                          : wallet
                      }
                    >
                      <Pen onClick={() => setIsModalOpen(true)} />
                    </StatsCard>
                  ))
                ) : (
                  <StatsCard
                    className="bg-gradient-to-tr from-purple-600 via-cyan-500 to-emerald-400"
                    title="Conversion rate"
                    value="0"
                  >
                    <Pen onClick={() => setIsModalOpen(true)} />
                  </StatsCard>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <StatsCard title="Pageviews / visit" value="4.20" />

                  <StatsCard
                    title="Revenue"
                    value="326.6 K"
                    change="+ 2 %"
                    isPositive
                  />

                  <StatsCard title="Avg. Time" value="00:03:27" />
                </div>
              </div>
            </section>

            {/* 2 – Row: circular charts */}

            <section className="grid gap-6 grid-cols-1 md:grid-cols-2">
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

              <MoneyInputModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveMoney}
              />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
