import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import LineChart from "../../../components/ui/LineChart";
import StatsCard from "../../../components/ui/StatsCard";
import CircularProgress from "../../../components/ui/CircularProgress";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

export default function DashboardPage() {
  // const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.replace("/");
  //   }
  // }, [status, router]);
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>

      <div className="flex min-h-screen bg-gray-950">
        {/* Sidebar */}
        <Sidebar />

        {/* Main column */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <Header />

          {/* Main content */}
          <main className="flex-1 space-y-6 p-10 rounded-xl">
            {/* 1 – Row: chart & stat cards */}
            <section className="grid gap-6 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <LineChart />
              </div>

              <div className="grid gap-6 lg:col-span-5">
                <StatsCard
                  className="bg-gradient-to-tr from-purple-600 via-cyan-500 to-emerald-400"
                  title="Conversion rate"
                  value="42.34 %"
                />
                <div className="grid grid-cols-2 gap-6">
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
            <section className="grid gap-6 lg:grid-cols-2">
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
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
