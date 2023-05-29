import supabase from "@/supabaseClient";

export const addChatData = async (user_id, batch_id, message, email, name) => {
  const { data, errorTable } = await supabase
    .from("user_chat")
    .insert({
      user_id: user_id,
      batch_id: batch_id,
      message: message,
      user_email: email,
      user_name: name,
    })
    .select();

  if (errorTable) {
    console.log(errorTable);
  }
  return data;
};

export const fetchChatHistoryBasedOnBatch = async (batch_id) => {
  const { data, error } = await supabase
    .from("user_chat")
    .select("*")
    .match({ batch_id: batch_id });

  if (error) {
    console.log("Error fetching batch_student_relation data: ", error);
    return null;
  }
  return data;
};
