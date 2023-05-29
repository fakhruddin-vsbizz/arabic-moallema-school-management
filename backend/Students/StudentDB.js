import supabase from "@/supabaseClient";

export const fetchStudentsData = async () => {
  const { data, error } = await supabase.from("student").select("*");
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};

export const updateStudentDetail = async (
  email,
  name,
  contact,
  batchId,
  studentId
) => {
  const { data4, error4 } = await supabase
    .from("student")
    .update({ email: email, name: name, contact: contact })
    .match({ student_id: studentId });

  const { data5, error5 } = await supabase
    .from("batch_student_relationship")
    .update({ batch_id: batchId })
    .match({ student_id: studentId });
};

export const fetchStudentIdBasedOnEmail = async (email) => {
  const { data, error } = await supabase
    .from("student")
    .select("student_id")
    .match({ email: email });
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};

export const updateStudentEmail = async (email, studentId) => {
  const { data4, error4 } = await supabase
    .from("student")
    .update({ email: email })
    .match({ student_id: studentId });
};

export const fetchStudentNameBasedOnEmail = async (email) => {
  const { data, error } = await supabase
    .from("student")
    .select("name")
    .match({ email: email });
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};
