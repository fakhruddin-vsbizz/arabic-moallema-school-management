import supabase from "@/supabaseClient";

export const fetchBatchesData = async () => {
  const { data, error } = await supabase.from("batches").select("*");
  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

export const createAnnouncement = async (
  batch,
  groupValue,
  title,
  description
) => {
  const { data, error } = await supabase
    .from("announcement")
    .insert({
      batch_id: batch,
      group: groupValue,
      title: title,
      description: description,
    })
    .select();
  if (error) {
    console.log("Error creating announcement: ", error);
    return null;
  }
  return data;
};

export const displayAnnouncements = async () => {
  const { data, error } = await supabase.from("announcement").select("*");
  if (error) {
    console.log("Error fetching announcement data: ", error);
    return null;
  }
  return data;
  console.log(data);
};
