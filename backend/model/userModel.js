import supabase from "../config/supabaseConnection.js";

export const createUser = async (userData) => {
  try {
    console.log(userData);
    const { data, error } = await supabase
      .from("player")
      .insert([userData])
      .select("*");

    if (error) {
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: true,
        data: data,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
