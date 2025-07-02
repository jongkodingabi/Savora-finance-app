// pages/api/wallets.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]"; // pastikan path sesuai
import { createClient } from "@supabase/supabase-js";

const supabaseNextAuth = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: "next_auth" } }
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    // Ambil data wallets milik user
    const { data, error } = await supabase
      .from("wallets")
      .select("*")
      .eq("user_id", session.user.id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  if (req.method === "POST") {
    const { amount } = req.body;
    const userId = session.user.id;

    // Cek apakah user sudah ada di tabel users (next_auth)
    const { data: existingUser, error: fetchError } = await supabaseNextAuth
      .from("users")
      .select("id")
      .eq("id", userId)
      .maybeSingle();

    if (fetchError) {
      return res.status(500).json({ error: fetchError.message });
    }

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: "User not found in next_auth.users" });
    }

    // Cek apakah wallet user sudah ada
    const { data: existingWallet, error: walletError } = await supabase
      .from("wallets")
      .select("id")
      .eq("user_id", userId)
      .maybeSingle();

    if (walletError) {
      return res.status(500).json({ error: walletError.message });
    }

    if (existingWallet) {
      // Update wallet jika sudah ada
      const { error } = await supabase
        .from("wallets")
        .update({ amount })
        .eq("id", existingWallet.id);

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ message: "Wallet updated!" });
    } else {
      // Insert wallet jika belum ada
      const { error } = await supabase.from("wallets").insert([
        {
          user_id: userId,
          amount: amount,
        },
      ]);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ message: "Wallet created!" });
    }
  }
}
