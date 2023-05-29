import supabase from "@/supabaseClient";

export const deleteTeacher = async (email, selectedTeacherId, teacherId) => {
  //remove from the relation
  const { data, error } = await supabase
    .from("batches")
    .select("batch_id")
    .match({ teacher_id: teacherId });

  console.log(data);
  if (data[0]) {
    const { data1, error1 } = await supabase
      .from("batches")
      .update({ teacher_id: selectedTeacherId })
      .match({ teacher_id: teacherId });
  }

  const { data4, error4 } = await supabase
    .from("batches")
    .update({ teacher_id: selectedTeacherId })
    .match({ teacher_id: teacherId });

  const { data5, error5 } = await supabase
    .from("session")
    .update({ teacher_id: null })
    .match({ teacher_id: teacherId });

  const { data3, error3 } = await supabase
    .from("teacher")
    .delete()
    .match({ teacher_id: teacherId });
};
