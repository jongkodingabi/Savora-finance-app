import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Wallet, Menu } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

const HeaderNavigation = () => {
  const { data }: any = useSession();
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <Wallet className="w-5 h-5 text-slate-900" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Savora
          </span>
        </Link>

        {/* <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="#features"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Fitur
          </Link>
          <Link
            href="#pricing"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Harga
          </Link>
          <Link
            href="#about"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Tentang
          </Link>
          <Link
            href="#contact"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Kontak
          </Link>
        </nav> */}

        <div className="flex items-center space-x-4">
          {data ? (
            <Link href={"/admin/dashboard"}>
              <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Button
              onClick={() => signIn()}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0"
            >
              Sign In
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNavigation;
