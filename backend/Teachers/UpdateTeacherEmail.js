import supabaseAdmin from "@/backend/DeleteUser/SupabaseAdmin";

export const updateTeacherEmailFromAuth = async (userId, newEmail) => {
  console.log(userId);
  const { data: user, error2 } = await supabaseAdmin.auth.admin.updateUserById(
    userId,
    {
      email: newEmail,
    }
  );

  if (error2) {
    console.error(error2);
    return;
  }

  console.log("Email updated successfully");
  console.log(user);
};
