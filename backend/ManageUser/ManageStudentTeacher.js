import supabase from "@/supabaseClient";

export const getStudentTeacherList = async (path) => {
  const { data, error } = await supabase.from(path).select("*");

  if (error) {
    console.log("Error fetching students data: ", error);
    return null;
  }
  return data;
};
