import supabase from "@/supabaseClient";

export const fetchStudentTeacherProfile = async (role, email) => {
  const { data, error } = await supabase
    .from(role)
    .select("*")
    .eq("email", email);
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  console.log(data);
  return data;
};

export const fetchStudentIdBasedonEmail = async (email) => {
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

export const fetchStudentDetailBasedonId = async (studentId) => {
  const { data, error } = await supabase
    .from("student")
    .select("*")
    .match({ student_id: studentId });

  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};

export const fetchTeacherIdBasedonEmail = async (email) => {
  const { data, error } = await supabase
    .from("teacher")
    .select("teacher_id")
    .match({ email: email });
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};

export const fetchTeachersDetailBasedonId = async (teacherId) => {
  const { data, error } = await supabase
    .from("teacher")
    .select("*")
    .match({ teacher_id: teacherId });
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};

export const fetchTeacherEmailBasedonId = async (teacherId) => {
  const { data, error } = await supabase
    .from("teacher")
    .select("email")
    .match({ teacher_id: teacherId });
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};
