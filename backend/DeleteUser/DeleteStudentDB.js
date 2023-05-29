import supabase from "@/supabaseClient";

export const deleteStudent = async (studentId) => {
  //remove from the relation
  const { data1, error1 } = await supabase
    .from("batch_student_relationship")
    .delete()
    .match({ student_id: studentId });

  //remove from the relation
  const { data3, error3 } = await supabase
    .from("student")
    .delete()
    .match({ student_id: studentId });
};
