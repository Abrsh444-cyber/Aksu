import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type PlanTier = Database["public"]["Enums"]["plan_tier"];
type SubStatus = Database["public"]["Enums"]["subscription_status"];

export interface Subscription {
  tier: PlanTier;
  status: SubStatus;
  current_period_end: string | null;
  isPro: boolean;
}

export function useSubscription() {
  const { user, loading: authLoading } = useAuth();
  const [sub, setSub] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setSub(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("subscriptions")
        .select("tier, status, current_period_end")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;

      if (!data) {
        setSub({ tier: "free", status: "active", current_period_end: null, isPro: false });
      } else {
        const isPro =
          data.status === "active" &&
          (data.tier === "pro_lifetime" ||
            data.tier === "pro_campus" ||
            data.tier === "pro_monthly" ||
            data.tier === "pro_yearly") &&
          (!data.current_period_end || new Date(data.current_period_end) > new Date());
        setSub({ ...data, isPro });
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [user, authLoading]);

  return { subscription: sub, loading: loading || authLoading };
}

/** Determine whether a course track is paid. */
export function isPaidTrack(track: string): boolean {
  // Grade 9 is free. Everything else (g10, g11-*, g12-*, euee) is Pro.
  return track !== "g9";
}
