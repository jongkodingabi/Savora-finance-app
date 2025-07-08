import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id)
    return res.status(401).json({ error: "Unauthorized" });

  const user_id = session.user.id;

  if (req.method === "GET") {
    // Ambil goals
    const { data: goals, error: goalsError } = await supabase
      .from("goals")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (goalsError) return res.status(500).json({ error: goalsError.message });

    // Ambil total amount dari wallets milik user
    const { data: wallets, error: walletError } = await supabase
      .from("wallets")
      .select("amount")
      .eq("user_id", user_id);

    if (walletError)
      return res.status(500).json({ error: walletError.message });

    const totalWalletAmount =
      wallets?.reduce((sum, wallet) => sum + wallet.amount, 0) || 0;

    // Hitung total target amount dari semua goals
    const totalTargetAmount = goals.reduce(
      (sum, goal) => sum + (goal.amount || 0),
      0
    );

    // Hitung progress keseluruhan
    const overallProgress =
      totalTargetAmount > 0
        ? Math.min((totalWalletAmount / totalTargetAmount) * 100, 100)
        : 0;

    // Tambahkan field percentage dan currentAmount ke masing-masing goal
    const goalsWithProgress = goals.map((goal) => {
      const percentage =
        goal.amount > 0
          ? Math.min((totalWalletAmount / goal.amount) * 100, 100)
          : 0;

      return {
        ...goal,
        currentAmount: totalWalletAmount,
        targetAmount: goal.amount,
        percentage,
      };
    });

    return res.status(200).json({
      data: goalsWithProgress,
      meta: {
        totalWalletAmount,
        totalTargetAmount,
        overallProgress,
      },
    });
  }
  if (req.method === "POST") {
    const { title, type, emoji, description, amount, priority } = req.body;

    const { error } = await supabase
      .from("goals")
      .insert([{ title, type, emoji, description, amount, priority, user_id }]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Goal created" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "Goal ID is required" });

    const { error } = await supabase
      .from("goals")
      .delete()
      .eq("id", id)
      .eq("user_id", user_id);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Goal deleted" });
  }

  return res.status(405).json({ error: "Method not allowed" });
}
