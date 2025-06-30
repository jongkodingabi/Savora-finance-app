import { Bell, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Header() {
  const { data: session }: any = useSession();
  return (
    <header className="flex items-center justify-between bg-gray-950 px-6 py-4">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-white">Project statistics</h1>
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 rounded-full bg-blue-500"></div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700">
          Share
        </button>
        <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
          Print
        </button>
        <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
          Insights
        </button>
        <button className="rounded-lg border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700">
          Schedule
        </button>

        <div className="flex items-center space-x-3">
          <Bell className="h-5 w-5 text-gray-400" />
          <div className="flex items-center space-x-2">
            <Image
              src={session?.user?.image}
              width={50}
              height={50}
              alt={session?.user?.name}
              className="h-8 w-8 rounded-full"
            ></Image>
            <span className="text-sm text-gray-300">
              {" "}
              <div className="flex flex-col">
                <span>{session?.user?.name ?? "Guest"}</span>
                <span>{session?.user?.email ?? "Guest"}</span>
              </div>
            </span>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
