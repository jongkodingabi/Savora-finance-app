import Link from "next/link";
import {
  Target,
  Building2,
  Brain,
  Zap,
  Settings,
  HelpCircle,
  LogOut,
  Home,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { Wallet } from "lucide-react";

const navigation = [
  { name: "Overview", href: "#", icon: Home, current: true },
  { name: "Opportunities", href: "#", icon: Target, current: false },
  { name: "My companies", href: "#", icon: Building2, current: false },
  { name: "Brain", href: "#", icon: Brain, current: false },
  { name: "Smart", href: "#", icon: Zap, current: false },
];

const bottomNavigation = [
  { name: "Settings", href: "#", icon: Settings },
  { name: "Help", href: "#", icon: HelpCircle },
  { name: "Logout", href: "#", icon: LogOut, onClick: () => signOut() },
];

export default function Sidebar() {
  return (
    <div className="flex min-h-screen w-64 flex-col bg-gray-950 border-r border-gray-800 text-white">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-4">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
          <Wallet className="w-5 h-5 text-slate-900" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Savora
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.current
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4">
        <ul className="space-y-2">
          {bottomNavigation.map((item) => (
            <li key={item.name}>
              {item.name === "Logout" ? (
                <button
                  type="button"
                  onClick={() =>
                    signOut({
                      callbackUrl: "/", // arahkan ulang ke root
                      redirect: true, // (opsional) pastikan redirect dilakukan
                    })
                  }
                  className="w-full flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
