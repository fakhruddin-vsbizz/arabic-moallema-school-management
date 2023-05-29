import supabase from "@/supabaseClient";

export const fetchTeachersData = async () => {
  const { data, error } = await supabase.from("teacher").select("*");
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};

export const updateTeacherDetail = async (email, name, contact, teacherId) => {
  const { data4, error4 } = await supabase
    .from("teacher")
    .update({ email: email, name: name, contact: contact })
    .match({ teacher_id: teacherId });
};

export const fetchTeachersIdBasedOnEmail = async (email) => {
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
export const updateTeacherEmail = async (email, teacherId) => {
  const { data4, error4 } = await supabase
    .from("teacher")
    .update({ email: email })
    .match({ teacher_id: teacherId });
};

export const fetchTeacherNameBasedOnEmail = async (email) => {
  const { data, error } = await supabase
    .from("teacher")
    .select("name")
    .match({ email: email });
  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};
