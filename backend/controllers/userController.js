import { createUser } from "../model/userModel.js";
import { CreateTeam } from "../model/teamModel.js";

export const RegisterByTeamCreation = async (req, res) => {
  try {
    const data = await req.body;
    const { teamName, leader } = req.body;

    const teamCreationDetails = { teamName, leader };

    //create a team
    const teamCreation = await CreateTeam(teamCreationDetails);

    if (!teamCreation.success) {
      res.status(500).json({ messsage: error.message, success: false });
    }

    const { teamCode, teamId } = teamCreation;

    const registrationData = [...data, teamId];
    //store data along with teamid
    const UserCreation = await createUser(registrationData);

    if (!UserCreation.success) {
      throw new Error("Failure while creating a user");
    }

    //user registration successful
    const responseData = {
      teamCode: teamCode,
    };
    res.status(200).json({
      message: "User Creation Successful",
      success: true,
      data: responseData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
};

export const RegisterByTeamCode = async (req, res) => {};
