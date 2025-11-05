import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import type { Medicine } from "@/types";

export function useMedicines(userId: string | undefined) {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = useCallback(async () => {
    if (!userId) {
      setMedicines([]);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("medicines")
      .select("*")
      .eq("user_id", userId)
      .order("name");

    setMedicines(data || []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    // ✅ Wrap async logic inside effect safely
    let isMounted = true;
    const doFetch = async () => {
      await fetch();
    };
    if (isMounted) doFetch();

    // Optional cleanup (prevents state updates on unmounted component)
    return () => {
      isMounted = false;
    };
  }, [fetch]);

  const save = async (med: Medicine) => {
    const { data, error } = await supabase
      .from("medicines")
      .upsert(
        { ...med, user_id: userId, updated_at: new Date() },
        { onConflict: "id" }
      )
      .select()
      .single();
    if (error) throw error;
    await fetch();
    return data;
  };

  const remove = async (id: string) => {
    await supabase.from("medicines").delete().eq("id", id);
    await fetch();
  };

  return { medicines, loading, save, remove, refetch: fetch };
}
