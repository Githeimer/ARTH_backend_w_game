import supabase from "../config/supabaseConnection.js";

export const createUser = async (userData) => {
  try {
    const { data, error } = await supabase
      .from("player")
      .insert([userData])
      .select("*");

    if (error) {
      console.log("Error while creating a User");
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
  } catch (error) {
    console.log("Unexecpeted Error in createUser function");
    return {
      success: false,
      message: error.message,
    };
  }
};
