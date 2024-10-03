import supabase from "../config/supabaseConnection.js";
import { GenerateTeamCode } from "../utilities/teamCodeGenerator.js";

export const CreateTeam = async (TeamDetails) => {
  const { teamName, leader_email } = TeamDetails; //teamName ra leader_email pathaira xa.

  const TeamCode = GenerateTeamCode();
  const { finaldata } = { ...TeamDetails, TeamCode };

  const { data, error } = await supabase.from("team").insert(TeamDetails); //estai kei code hunxa

  // success message return error check hanera

  const responseData = {
    success: true,
  };
  return responseData;
};

export const ValidateTeamCode = async (TeamCode) => {
  // interaction with supabase to validate teamCode
};

export const ViewTeamStatus = async (TeamCode) => {
  //interaction with supabase to check count of members;
  //also send the team name, members details in certain object format
};
