import { ViewTeamStatus, ValidateTeamCode } from "../model/teamModel.js";

export const TeamStatus = async (req, res) => {
  try {
    const teamCode = req.params.id;

    // Validate the provided team code
    const validateTeam = await ValidateTeamCode(teamCode);

    if (!validateTeam.success) {
      return res.status(500).json({
        message: validateTeam.message,
        success: false,
        error: validateTeam.error,
      });
    }

    const team_id = validateTeam.teamId;
    const teamName = validateTeam.teamName;

    // Get the team status and members using the team_id
    const teamStatus = await ViewTeamStatus(team_id);

    if (!teamStatus.success) {
      return res
        .status(500)
        .json({ message: teamStatus.message, success: false });
    }

    // Structure the response data with proper member assignment
    const responseData = {
      teamName: teamName,
      memberCount: teamStatus.members.length, // Get the count of actual members
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
