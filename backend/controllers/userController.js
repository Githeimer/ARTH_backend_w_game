import { createUser } from "../model/userModel.js";
import {
  CreateTeam,
  ValidateTeamCode,
  MemberCount,
} from "../model/teamModel.js";

import supabase from "../config/supabaseConnection.js";

export const RegisterByTeamCreation = async (req, res) => {
  try {
    const { name, email, phone_number, institution, address, social_media } =
      req.body.userData;
    const { teamName } = req.body;

    // Pre-check for unique teamName, email, and phone_number
    const { data: teamExists, error: teamError } = await supabase
      .from("team")
      .select("team_name")
      .eq("team_name", teamName)
      .maybeSingle();

    const { data: emailExists, error: emailError } = await supabase
      .from("player")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    const { data: phoneExists, error: phoneError } = await supabase
      .from("player")
      .select("phone_number")
      .eq("phone_number", phone_number)
      .maybeSingle();

    if (teamExists || emailExists || phoneExists) {
      return res.status(400).json({
        message: "Unique constraint violation",
        success: false,
        errors: {
          teamName: teamExists ? "Team name is already taken" : undefined,
          email: emailExists ? "Email is already registered" : undefined,
          phone_number: phoneExists
            ? "Phone number is already registered"
            : undefined,
        },
      });
    }

    // Proceeding with team creation if no unique constraints are violated
    const teamCreationDetails = { teamName, team_leader_email: email };
    const teamCreation = await CreateTeam(teamCreationDetails);

    if (!teamCreation.success) {
      return res.status(500).json({
        message: "Error while creating team",
        success: false,
        error: teamCreation.message,
      });
    }

    const { teamId, teamCode } = teamCreation;
    const registrationData = {
      name,
      email,
      phone_number,
      institution,
      address,
      social_media,
      team_id: teamId,
    };

    const UserCreation = await createUser(registrationData);

    if (!UserCreation.success) {
      return res.status(500).json({
        message: "Failure while creating a user",
        error: UserCreation.message,
        success: false,
      });
    }

    return res.status(200).json({
      message: "User creation successful",
      success: true,
      data: { teamCode },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

export const RegisterByTeamCode = async (req, res) => {
  try {
    const { teamCode } = req.body;
    const { name, email, phone_number, institution, address, social_media } =
      req.body.userData;

    // Validate team code and retrieve team data
    const validationDetails = await ValidateTeamCode(teamCode);

    // Check if team code validation was successful and team_id exists
    if (!validationDetails.success || !validationDetails.teamId) {
      return res.status(401).json({
        message: "The provided team code does not match any existing team",
        success: false,
      });
    }

    const { teamId, teamName } = validationDetails;

    // Check member count to ensure team has not exceeded maximum members
    const MemberValidation = await MemberCount(teamId);
    const maxMembers = 3;

    if (MemberValidation.memberCount >= maxMembers) {
      return res.status(400).json({
        message: "This team already has 3 members",
        success: false,
      });
    }

    // Check for unique constraints on email and phone_number in player table
    const { data: emailExists } = await supabase
      .from("player")
      .select("email")
      .eq("email", email)
      .maybeSingle();

    const { data: phoneExists } = await supabase
      .from("player")
      .select("phone_number")
      .eq("phone_number", phone_number)
      .maybeSingle();

    if (emailExists || phoneExists) {
      return res.status(400).json({
        message: "Unique constraint violation",
        success: false,
        errors: {
          email: emailExists ? "Email is already registered" : undefined,
          phone_number: phoneExists
            ? "Phone number is already registered"
            : undefined,
        },
      });
    }

    // Proceed with user creation if no unique constraints are violated
    const registrationData = {
      name,
      email,
      phone_number,
      institution,
      address,
      social_media,
      team_id: teamId,
    };

    const UserCreation = await createUser(registrationData);

    if (!UserCreation.success) {
      return res.status(500).json({
        message: "Failure while creating a user",
        success: false,
        error: UserCreation.message,
      });
    }

    return res.status(200).json({
      message: "User creation successful",
      success: true,
      data: { teamCode, teamName },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};
