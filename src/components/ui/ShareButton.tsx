"use client";

import { MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface ShareButtonsProps {
  url?: string;
  amount: any;
}

export default function ShareButtons({
  amount,
  url = "https://yourapp.com",
}: ShareButtonsProps) {
  const [whatsappUrl, setWhatsappUrl] = useState("#");

  useEffect(() => {
    const validAmount =
      typeof amount === "number" && !isNaN(amount) ? amount : 0;

    const formattedAmount = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(validAmount);

    // Gunakan %0A untuk newline yang aman di URL
    const rawMessage = `💰 Akhirnya tabungan gue udah nyampe ${formattedAmount}! 😎
    
Gue pake dashboard keuangan ini buat ngawasin semua arus duit — biar gak jebol tiap akhir bulan 🧠📊

Cobain deh, lumayan bantu banget 👉 ${url}

#CuanGoals #AnakKeuangan #GakBorosClub`;

    const encodedMsg = encodeURIComponent(rawMessage);
    const finalWhatsappUrl = `https://wa.me/?text=${encodedMsg}`;
    setWhatsappUrl(finalWhatsappUrl);
  }, [amount, url]);

  return (
    <div className="mt-4">
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-3 text-xs md:text-sm font-medium text-white hover:bg-purple-700 transition"
      >
        <MessageCircleMore className="w-4 h-4" />
        Share via WhatsApp
      </Link>
    </div>
  );
}
