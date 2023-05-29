import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_UR;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(
  "https://zqajlebtdlrbrmicprbc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxYWpsZWJ0ZGxyYnJtaWNwcmJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MjczMzAsImV4cCI6MjAwMDMwMzMzMH0.41DjaBHVcJVFpiBzHnt6i_cahnZZmHx7mdcTY0vjIS8"
);

// const supabase = createClient(
//   "https://cdwdhedavgkgpexhthtx.supabase.co",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkd2RoZWRhdmdrZ3BleGh0aHR4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3NDcwNTQ1MiwiZXhwIjoxOTkwMjgxNDUyfQ.nYUbBvX4zKMmpc2ECrl9Aznvqoa6J5YqQ8kIsYwWZ_M",
//   {
//     auth: {
//       autoRefreshToken: true,
//       persistSession: true,
//     },
//   }
// );
export default supabase;
