import supabase from "../config/supabaseConnection.js";
import { GenerateTeamCode } from "../utilities/teamCodeGenerator.js";

export const CreateTeam = async (TeamDetails) => {
  try {
    const { teamName, team_leader_email } = TeamDetails;

    

    const TeamCode = GenerateTeamCode();
    
    let teamData = {
      team_code: TeamCode,
      team_name: teamName,
      team_leader_email: team_leader_email,
    };

   

    const { data, error } = await supabase
      .from("team")
      .insert(teamData)
      .select("*"); // Make sure to select data to get back the inserted row

    if (error) {
      console.error("Error inserting team data:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    // Check if data is null or empty
    if (!data || data.length === 0) {
      console.error("No data returned from Supabase after insertion.");
      return {
        success: false,
        message: "Team created but no data returned.",
      };
    }

    // Return success response with relevant team data
    return {
      success: true,
      teamId: data[0]?.team_id, // Safely accessing team_id
      teamCode: TeamCode,
    };
  } catch (err) {
    console.error("Unexpected error in CreateTeam function:", err.message);
    return {
      success: false,
      message: err.message,
    };
  }
};

export const ValidateTeamCode = async (TeamCode) => {
  //response should be this format if it is true
  const teamId = 1;
  const responseData = {
    success: true,
    teamId: teamId,
  };

  return responseData;
};

export const ViewTeamStatus = async (TeamCode) => {
  //interaction with supabase to check count of members;
  //also send the team name, members details in certain object format
};
