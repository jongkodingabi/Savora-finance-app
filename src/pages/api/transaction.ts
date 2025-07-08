import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";

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

  if (req.method == "DELETE") {
    const { id } = req.body;
    const { error } = await supabase
      .from("transactions")
      .delete()
      .match({ id: id, user_id: session.user.id });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Transaction deleted!" });
  }

  if (req.method === "GET") {
    // Fetch transactions for the user
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `
        id,
        amount,
        type,
        payment_method,
        date,
        note,
        category_id (
          name
        )
      `
      )
      .eq("user_id", session.user.id)
      .order("date", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }
  if (req.method === "POST") {
    const { amount, type, category_id, date, note, payment_method } = req.body;
    const user_id = session.user.id;

    const trx = await supabase
      .from("transactions")
      .insert([
        { amount, type, category_id, date, note, payment_method, user_id },
      ]);

    if (trx.error) return res.status(500).json({ error: trx.error.message });

    // Update wallet amount
    const wallet = await supabase
      .from("wallets")
      .select("amount, id")
      .eq("user_id", user_id)
      .maybeSingle();
    if (wallet.error || !wallet.data)
      return res.status(500).json({ error: "Wallet not found." });

    const currentAmount = parseFloat(wallet.data.amount);
    const newAmount =
      type === "income"
        ? currentAmount + parseFloat(amount)
        : type === "expense" || type === "transfer"
        ? currentAmount - parseFloat(amount)
        : currentAmount;

    const updateWallet = await supabase
      .from("wallets")
      .update({ amount: newAmount })
      .eq("id", wallet.data.id);

    if (updateWallet.error)
      return res.status(500).json({ error: updateWallet.error.message });

    return res.status(200).json({
      message: "Transaksi berhasil ditambahkan dan wallet diperbarui.",
    });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
