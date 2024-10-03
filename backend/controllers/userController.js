import { createUser } from "../model/userModel.js";
import { CreateTeam, ValidateTeamCode } from "../model/teamModel.js";

export const RegisterByTeamCreation = async (req, res) => {
  try {
    const { leader, data } = await req.body.userData;
    const { teamName } = await req.body;

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

export const RegisterByTeamCode = async (req, res) => {
  try {
    const { teamCode } = await req.body;
    const { data } = await req.body.userData;

    const validationDetails = await ValidateTeamCode(teamCode);

    if (!validationDetails.success) {
      res
        .status(401)
        .json({ message: "Team Code Doesn't Match", success: false });
    }
    const teamId = validationDetails.teamId;
    const registrationData = [...data, teamId];

    const UserCreation = await createUser(registrationData);

    if (!UserCreation.success) {
      res
        .status(500)
        .json({ message: "Failure while creating a user", success: false });
    }

    const responseData = {
      success: true,
      teamCode: teamCode,
    };

    res
      .status(200)
      .json({
        message: "User creation successfull",
        success: true,
        data: responseData,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
