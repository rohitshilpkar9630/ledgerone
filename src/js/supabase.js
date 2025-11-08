// src/js/supabase.js
// src/js/supabase.js
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

// --- Create Supabase client ---
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: true,       // store session in localStorage
    storageKey: "ledgerone.auth", // unique key (avoid overwriting if multiple projects)
    autoRefreshToken: true,     // automatically refresh tokens
    detectSessionInUrl: true,   // restores session after redirects
  },
});

// --- Wait for session restoration (important for static sites) ---
export async function getCurrentSession() {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session;
  } catch (e) {
    console.error("Error fetching session:", e);
    return null;
  }
}

// --- Utility to get the current logged-in user ---
export async function getUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

// --- Debug (optional) ---
if (typeof window !== "undefined") {
  supabase.auth.onAuthStateChange((event, session) => {
    console.log("[Supabase Auth Event]", event, session);
  });
}
