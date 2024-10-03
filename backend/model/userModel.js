import supabase from "../config/supabaseConnection.js";

export const createUser = async (userData) => {
  try {
    const { data, error } = await supabase.from("player").insert([userData]);

    if (error) {
      console.log(error);
      return {
        success: false,
        message: error.message,
      };
    } else {
      return {
        success: true,
        data,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};
