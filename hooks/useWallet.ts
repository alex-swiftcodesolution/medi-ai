import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { MedicalWallet } from "@/types";

export function useWallet(userId: string | undefined) {
  const [wallet, setWallet] = useState<MedicalWallet>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("medical_wallets")
      .select("*")
      .eq("user_id", userId)
      .single()
      .then(({ data, error }) => {
        if (data) setWallet(data);
        else if (error && error.code !== "PGRST116") console.error(error);
        setLoading(false);
      });
  }, [userId]);

  const save = async (updates: Partial<MedicalWallet>) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("medical_wallets")
      .upsert(
        { user_id: userId, ...updates, updated_at: new Date() },
        { onConflict: "user_id" }
      )
      .select()
      .single();
    if (error) throw error;
    setWallet(data);
  };

  return { wallet, setWallet, loading, save };
}
