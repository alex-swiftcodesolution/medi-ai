import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types";

export function useProfile(userId: string | undefined) {
  const [profile, setProfile] = useState<Profile>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, [userId]);

  const save = async (updates: Partial<Profile>) => {
    if (!userId) return;
    const { error } = await supabase
      .from("profiles")
      .upsert({ id: userId, ...updates, updated_at: new Date() });
    if (error) throw error;
  };

  return { profile, setProfile, loading, save };
}
