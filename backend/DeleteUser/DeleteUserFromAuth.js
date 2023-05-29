import supabaseAdmin from "./SupabaseAdmin";

export const deleteFromAuth = async (email) => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  const userList = data.users;

  const deleteUser = userList.filter((user) => user.email === email);

  const userId = deleteUser[0].id;

  if (userId) {
    const { data1, error1 } = await supabaseAdmin.auth.admin.deleteUser(userId);
  }
};
