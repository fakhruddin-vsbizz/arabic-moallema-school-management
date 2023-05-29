import supabase from "@/supabaseClient";

export const addStudentToBatch = async (studentId, batchId) => {
  const { data, error } = await supabase
    .from("batch_student_relationship")
    .insert({ student_id: studentId, batch_id: batchId })
    .select();

  if (error) {
    console.log("Error fetching batches data: ", error);
    return null;
  }
  return data;
};

