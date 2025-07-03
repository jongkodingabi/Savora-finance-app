import { Bell, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session }: any = useSession();
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mt-14 md:mt-4 bg-gray-950 px-4 py-3 md:px-6 md:py-4">
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
          <button className="rounded-lg bg-purple-600 px-3 py-2 text-xs md:text-sm font-medium text-white hover:bg-purple-700">
            Share
          </button>
          <button className="rounded-lg border border-gray-600 px-3 py-2 text-xs md:text-sm font-medium text-gray-300 hover:bg-gray-700">
            Print
          </button>
          <button className="rounded-lg border border-gray-600 px-3 py-2 text-xs md:text-sm font-medium text-gray-300 hover:bg-gray-700">
            Insights
          </button>
          <button className="rounded-lg border border-gray-600 px-3 py-2 text-xs md:text-sm font-medium text-gray-300 hover:bg-gray-700">
            Schedule
          </button>
        </div>
        <div className="flex items-center space-x-2 md:space-x-3 mt-2 md:mt-0">
          <Bell className="h-5 w-5 text-gray-400" />
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
