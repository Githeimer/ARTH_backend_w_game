import { ViewTeamStatus } from "../model/teamModel.js";

export const TeamStatus = async (req, res) => {
  try {
    const teamCode = req.params;

    const TeamStatus = await ViewTeamStatus(teamCode);

    if (!TeamStatus.success) {
      res
        .statu(500)
        .json({ message: "error while checking team status", success: false });
    }

    const responseData = {
      teamName: TeamStatus.teamName,
      memberCount: TeamStatus.membercount,
      members: {
        player1: TeamStatus.players.player1.email,
        player2: TeamStatus.players.player2.email,
        player3: TeamStatus.players.player2.email,
      },
    };

    res
      .status(200)
      .json({ message: "Success", success: true, data: responseData });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};
