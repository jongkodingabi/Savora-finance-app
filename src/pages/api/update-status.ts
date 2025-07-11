import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { createClient } from "@supabase/supabase-js";
import type { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.id) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  // Ambil total wallet user
  const { data: wallets, error: walletError } = await supabase
    .from("wallets")
    .select("amount")
    .eq("user_id", userId)
    .maybeSingle();

  if (walletError) {
    return res.status(500).json({ error: walletError.message });
  }

  const walletAmount = parseFloat(wallets?.amount || "0");

  // Ambil semua goals user yang status-nya masih ongoing
  const { data: goals, error: goalsError } = await supabase
    .from("goals")
    .select("id, amount, title, type, emoji, description")
    .eq("user_id", userId)
    .eq("status", "ongoing");

  if (goalsError) {
    return res.status(500).json({ error: goalsError.message });
  }
  if (!goals || goals.length === 0) {
    return res.status(404).json({ error: "Goal not found" });
  }

  const goalsToComplete = goals.filter(
    (goal: any) => walletAmount >= parseFloat(goal.amount || "0")
  );

  for (const goal of goalsToComplete) {
    // 1. Update status goal jadi 'completed'
    const { error: updateError } = await supabase
      .from("goals")
      .update({ status: "completed" })
      .eq("id", goal.id)
      .eq("user_id", userId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // 2. Tambahkan notifikasi
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        title: `🎉 Goal "${goal.title}" completed!`,
        description: `Type goal ${goal.type} successfully reached.`,
        type: "goal_completed",
        emoji: goal.emoji || "✅",
        read: false,
      });

    if (notificationError) {
      return res.status(500).json({ error: notificationError.message });
    }
  }

  return res
    .status(200)
    .json({ message: "Goals updated and notifications sent." });
}
