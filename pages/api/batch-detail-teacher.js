// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import supabase from "@/supabaseClient";

async function handler(req, res) {
  if (req.method === "GET") {
    console.log();
    const data = req.body;

    const response = await supabase.from("batches").select("*");
    console.log(response.data);
    res.json(response.data);
  }
}

export default handler;
