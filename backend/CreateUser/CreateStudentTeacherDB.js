import supabase from "@/supabaseClient";

export const createStudentTeacher = async (email, password, type) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        type: type,
      },
    },
  });

  if (error) {
    console.log("Error Login the User: ", error);
    return null;
  }
  return data;
};

export const addStudentTeacherToDB = async (
  finalUser,
  email,
  name,
  contact,
  typeUser
) => {
  const { data, errorTable } = await supabase
    .from(finalUser)
    .insert({
      email: email,
      name: name,
      contact: contact,
      type: typeUser,
    })
    .select();
  if (errorTable) {
    console.log(errorTable);
  }
  return data;
};

export const getStudentId = async (email) => {
  const { data, error } = await supabase
    .from("student")
    .select("student_id")
    .match({ email: email });

  if (error) {
    console.log(error);
    return;
  }
  console.log(data);
  return data;
};
