import { Bell, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShareButton from "./ShareButton";

export default function Header() {
  const { data: session }: any = useSession();
  const [notifications, setNotifications] = useState<any[]>([]);
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
    } else {
      console.error(data.error || "Failed to fetch notifications");
    }
  };
  useEffect(() => {
    fetchNotifications();
    fetchTotalAmount();
  }, []);

  const unReadCount = notifications.filter((note) => !note.read).length;
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-14 md:mt-4 px-4 py-3 md:px-6 md:py-4">
      <div className="flex items-center space-x-3 md:space-x-4">
        <h1 className="text-lg md:text-xl font-semibold text-white">
          Finance Overview
        </h1>
        <div className="flex items-center space-x-2">
          <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-blue-500 animate-pulse"></div>
        </div>
      </div>
      <div className="font-semibold">
        Welcome Back, {session?.user?.name} 👋
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:space-x-4">
        <div className="flex gap-2 md:gap-4">
          <ShareButton amount={totalAmount} />
          <button className="rounded-lg border border-gray-600 px-3 py-2 text-xs md:text-sm font-medium text-gray-300 hover:bg-gray-700">
            Print
          </button>
          <button className="rounded-lg border border-gray-600 px-3 py-2 text-xs md:text-sm font-medium text-gray-300 hover:bg-gray-700">
            Insights
          </button>
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
    </header>
  );
}
