import supabase from "../config/supabaseConnection.js";

export const createUser = async (UserData) => {
  const { data, error } = await supabase.from("player").insert(UserData);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
