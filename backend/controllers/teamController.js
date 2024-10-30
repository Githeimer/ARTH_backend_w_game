import { ViewTeamStatus, ValidateTeamCode } from "../model/teamModel.js";

export const TeamStatus = async (req, res) => {
  try {
    const teamCode = req.params.id;
    const validateTeam = await ValidateTeamCode(teamCode);

    if (!validateTeam.success || !validateTeam.teamId) {
      return res.status(404).json({
        message: "The provided team code does not match any existing team",
        success: false,
      });
    }

    const { teamId, teamName } = validateTeam;
    const teamStatus = await ViewTeamStatus(teamId);

    if (!teamStatus.success) {
      return res.status(500).json({
        message: teamStatus.message,
        success: false,
      });
    }

    const responseData = {
      teamName,
      memberCount: teamStatus.members.length,
      members: {
        player1: teamStatus.members[0] || "Not Assigned",
        player2: teamStatus.members[1] || "Not Assigned",
        player3: teamStatus.members[2] || "Not Assigned",
      },
    };

    return res.status(200).json({
      message: "Success",
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error: " + error.message, success: false });
  }
};
