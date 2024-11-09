import { findPlayerByCode } from "../model/gameModel.js";

export const UpdateGameData = async (req, res) => {
  try {
    const data = req.body;
    const { playerCode } = data;

    if (!playerCode) {
      res.status(500).json({ message: "Didnt receive Player Code" });
    }

    res.status(200).json({ message: "data receieved" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
