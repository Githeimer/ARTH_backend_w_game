import {
  findPlayerByCode,
  updatePlayerData,
  getPlayerData,
} from "../model/gameModel.js";

export const UpdateGameData = async (req, res) => {
  try {
    const data = req.body;
    const { playerCode, player_game_data } = data;

    if (!playerCode) {
      res.status(401).json({ message: "Didn't receive Player Code" });
      return;
    }

    const result = await findPlayerByCode(playerCode);

    if (!result.success) {
      res.status(401).json({ message: result.message });
      return;
    }

    const gameDataResult = await updatePlayerData(playerCode, player_game_data);

    if (!gameDataResult.success) {
      res.status(500).json({ message: gameDataResult.message });
      return;
    }

    res.status(200).json({
      message: "Player data updated successfully",
      data: gameDataResult.data,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || "An unexpected error occurred." });
  }
};

export const getGameData = async (req, res) => {
  try {
    const id = await req.params.playerCode;

    const result = await getPlayerData(id);

    if (!result.success) {
      res.status(401).json({ message: result.message });
      return;
    }

    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.log(error);
  }
};
