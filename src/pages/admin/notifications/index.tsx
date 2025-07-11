import Head from "next/head";
import Sidebar from "../../../components/ui/Sidebar";
import Header from "../../../components/ui/Header";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { Bell, ChevronDown } from "lucide-react";
import ShareButtons from "@/components/ui/ShareButton";

export default function DashboardPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [totalNotification, setTotalNotification] = useState<any[]>([]);
  const unReadCount = notifications.filter((note) => !note.read).length;
  const { data: session }: any = useSession();
  const [wallets, setTotalWallets] = useState<any[]>([]);

  const fetchTotalAmount = async () => {
    const res = await fetch("/api/wallets");
    const data = await res.json();
    if (res.ok) {
      setTotalWallets(data.data);
    } else {
      console.error(data.error || "Failed to fetch total amount");
    }
  };

  const totalAmount = wallets?.[0]?.amount ?? 0;

  const fetchNotifications = async () => {
    const res = await fetch("/api/notification");
    const data = await res.json();
    if (res.ok) {
      setNotifications(data.notifications);
      setTotalNotification(data.notifications.length);
    } else {
      toast.error(data.error || "Failed to fetch notifications");
    }
  };

  const markAsRead = async (id: string) => {
    const res = await fetch("/api/mark-read", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Marked as read");
      fetchNotifications(); // refresh state
      toast.success("Notification marked as read");
    } else {
      console.error("Error:", data.error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchTotalAmount();
  }, []);

  //   const fetchNotifications = async () => {
  //     const res = await fetch("/api/notification");
  //     const data = await res.json();
  //     if (res.ok) {
  //       setNotifications(data.notifications);
  //     } else {
  //       console.error(data.error || "Failed to fetch notifications");
  //     }
  //   };
  return (
    <>
      <Head>
        <title>Notifications - Dashboard</title>
      </Head>

      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 md:flex-row">
        <Toaster position="top-right" reverseOrder={false} />

        {/* Sidebar */}
        <Sidebar />
        {/* Main column */}
        <div className="flex flex-1 flex-col">
          {/* Top bar */}
          <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-14 md:mt-4 px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center space-x-3 md:space-x-4">
              <h1 className="text-lg md:text-xl font-semibold text-white">
                Finance Overview
              </h1>
              <div className="flex items-center space-x-2">
                <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-blue-500 animate-pulse"></div>
              </div>
            </div>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:space-x-4">
              <div className="flex gap-2 md:gap-4">
                <ShareButtons amount={totalAmount} />

                {/* <button className="rounded-lg border border-gray-600 px-3 py-2 text-xs md:text-sm font-medium text-gray-300 hover:bg-gray-700">
              Schedule
            </button> */}
              </div>
              <div className="flex items-center space-x-2 md:space-x-3 mt-2 md:mt-0">
                <Link href="/admin/notifications" className="relative">
                  <Bell className="h-5 w-5 text-gray-400 cursor-pointer" />
                  {unReadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                      {unReadCount > 9 ? "9+" : unReadCount}
                    </span>
                  )}
                </Link>

                <div className="flex items-center space-x-2">
                  <Image
                    src={session?.user?.image || "/default-avatar.png"}
                    width={32}
                    height={32}
                    alt={session?.user?.name || "User"}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm text-gray-300">
                      {session?.user?.name ?? "Guest"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {session?.user?.email ?? "Guest"}
                    </span>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </header>{" "}
          {/* Main content */}
          <section className="rounded-2xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 p-6 shadow-lg m-10">
            <h3 className="mb-6 text-xl font-bold text-white flex items-center gap-2">
              <span>📣</span> Notifications
            </h3>

            {notifications.length === 0 ? (
              <div className="text-center text-gray-400 text-sm">
                You have no notifications at the moment.
              </div>
            ) : (
              <ul className="space-y-4 max-h-full pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {notifications.map((note) => (
                  <li
                    key={note.id}
                    className="flex items-start gap-4 bg-gray-700 p-4 rounded-xl shadow-sm hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="text-3xl">{note.emoji || "🔔"}</div>

                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-base mb-1">
                        {note.title}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {note.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(note.created_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>

                      {!note.read && (
                        <button
                          onClick={() => markAsRead(note.id)}
                          className="mt-2 text-xs text-blue-400 hover:underline"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
