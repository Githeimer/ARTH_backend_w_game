import supabase from "../config/supabaseConnection.js";

export const updatePlayerData = async (playerCode, playerGameData) => {
  try {
    const { data, error } = await supabase
      .from("game_data")
      .update(playerGameData)
      .eq("player_code", playerCode)
      .select();

    if (error) {
      console.error("Error Updating Player Data:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Player data updated successfully",
      data,
    };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const findPlayerByCode = async (PlayerCode) => {
  try {
    const { data, error } = await supabase
      .from("game_data")
      .select("*")
      .eq("player_code", PlayerCode);

    if (error) {
      console.error("Error Finding Player", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    if (data && data.length > 0) {
      return {
        success: true,
        message: data,
      };
    } else {
      return {
        success: false,
        message: "Player code is incorrect or does not exist.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const getPlayerData = async (PlayerCode) => {
  try {
    const playerData = await findPlayerByCode(PlayerCode);

    if (!playerData.success) {
      return {
        success: false,
        message: playerData.message,
      };
    }

    const data = playerData.message[0];

    if (data) {
      return {
        success: true,
        message: data,
      };
    }

    return;
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};
