// pages/api/categories.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
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

  const userId = session.user.id;

  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("user_id", userId);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ data });
  }

  if (req.method === "POST") {
    const { name, type } = req.body;

    const { error } = await supabase.from("categories").insert([
      {
        name,
        type,
        user_id: userId,
      },
    ]);

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Category created!" });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    const { error } = await supabase
      .from("categories")
      .delete()
      .match({ id: id, user_id: session.user.id });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ message: "Category deleted!" });
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
