import { createClient } from "@supabase/supabase-js";
const supabaseAdmin = createClient(
  "https://zqajlebtdlrbrmicprbc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYWpsZWJ0ZGxyYnJtaWNwcmJjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDcyNzMzMCwiZXhwIjoyMDAwMzAzMzMwfQ._V3W4q0_lW9RkpTvK2f3QbtktKT6wVwjdThlEeKM_Lo",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export default supabaseAdmin;
