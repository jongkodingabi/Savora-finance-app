"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ShareButtonsProps {
  url?: string;
  amount: number;
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
    const rawMessage = `Finally hit my savings goal: ${formattedAmount}! 

Been tracking my income & expenses daily — and it's really paying off!

I’m using this finance dashboard to manage everything and stay on track.

You should try it too  ${url}

#MoneyGoals #TrackYourSpending #FinancialFreedom`;

    const encodedMsg = encodeURIComponent(rawMessage);
    const finalWhatsappUrl = `https://wa.me/?text=${encodedMsg}`;
    setWhatsappUrl(finalWhatsappUrl);
  }, [amount, url]);

  return (
    <div className="">
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <button className="rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-2 text-xs md:text-sm font-medium text-white hover:bg-purple-700">
          Share Via Whatsapp
        </button>
      </Link>
    </div>
  );
}
