import { ViewTeamStatus } from "../model/teamModel.js";

export const TeamStatus = async (req, res) => {
  try {
    const teamCode = req.params;

    const TeamStatus = await ViewTeamStatus(teamCode);
    console.log(TeamStatus);

    if (!TeamStatus.success) {
      res
        .status(500)
        .json({ message: "error while checking team status", success: false });
    } else {
      console.log('ResponseData Below');
      console.log(TeamStatus.player[0]);
      console.log(TeamStatus.membercount);
      const responseData = {
        teamName: TeamStatus.teamName,
        memberCount: TeamStatus.membercount,
        members: {
          player1: TeamStatus.player[0],
          player2: TeamStatus.player[1],
          player3: TeamStatus.player[2],
        },
      };

      console.log(responseData);
      console.log('Response data above');

      res
        .status(200)
        .json({ message: "Success", success: true, data: responseData });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};