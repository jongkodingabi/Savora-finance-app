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

  //   Ambil total wallet user
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
    .select("id, amount")
    .eq("user_id", userId)
    .eq("status", "ongoing");

  if (goalsError) {
    return res.status(500).json({ error: goalsError.message });
  }
  if (!goals) {
    return res.status(404).json({ error: "Goal not found" });
  }

  const goalsToComplete = goals.filter(
    (goal: any) => walletAmount >= parseFloat(goal.amount || "0")
  );

  for (const goal of goalsToComplete) {
    // Update goal status to 'completed'
    const { error: updateError } = await supabase
      .from("goals")
      .update({ status: "completed" })
      .eq("id", goal.id)
      .eq("user_id", userId);

    if (updateError) {
      return res.status(500).json({ error: updateError.message });
    }

    // Optionally, you can also delete the goal if needed
    // const { error: deleteError } = await supabase
    //   .from("goals")
    //   .delete()
    //   .eq("id", goal.id)
    //   .eq("user_id", userId);
    // if (deleteError) {
    //   return res.status(500).json({ error: deleteError.message });
    // }
  }
}
