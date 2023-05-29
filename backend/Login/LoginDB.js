import supabase from "@/supabaseClient";

export const LoginUser = async (enteredEmailValue, enteredPasswordValue) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: enteredEmailValue,
    password: enteredPasswordValue,
  });

  if (error) {
    console.log("Error Login the User: ", error);
    return null;
  }
  return data;
};
