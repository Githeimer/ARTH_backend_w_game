import supabase from "../config/supabaseConnection.js";

export const updatePlayerData = async (playerData) => {
  try {
    const { data, error } = await supabase
      .from("game_data")
      .update([playerData]);
  } catch (error) {
    console.error(error);
  }
};

export const findPlayerByCode = async (PlayerCode) => {
  try {
    const { data, error } = await supabase
      .from("game_data")
      .select("*")
      .eq("playerCode", PlayerCode);

    if (error) {
      console.error("Error Finding Player", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
  } catch (error) {}
};
