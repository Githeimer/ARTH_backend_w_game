import supabase from "../config/supabaseConnection.js";
import { GenerateTeamCode } from "../utilities/teamCodeGenerator.js";
import { check_member } from "../utilities/checkMember.js";

export const CreateTeam = async (TeamDetails) => {
  try {
    const { teamName, team_leader_email } = TeamDetails;

    const TeamCode = GenerateTeamCode();
    const date = new Date();
    const formattedDate = date.toLocaleString("en-GB", { hour12: false });

    console.log(formattedDate);
    const teamData = {
      team_code: TeamCode,
      team_name: teamName,
      created_at: formattedDate,
      team_leader_email: team_leader_email,
      score: 0,
    };

    const { data, error } = await supabase
      .from("team")
      .insert([teamData])
      .select("*"); // Make sure to select data to get back the inserted row
    console.log(data);

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
    console.error("Error in CreateTeam function:", err.message);
    return {
      success: false,
      message: err.message,
    };
  }
};

export const ValidateTeamCode = async (TeamCode) => {
  
  let { data: player, error } = await supabase
  .from('player')
  .select("team_id")
  .eq('team_code', TeamCode)
  .limit(1)
  

  
  
  if(error)
  {
   
    return {
      success:false
    }
  }

  else{
    
    return {
      success:true,
      teamId:player[0].team_id,
    }
  }

};

export const ViewTeamStatus = async (TeamCode) => {
//   //interaction with supabase to check count of members;
//   //also send the team name, members details in certain object format
const team_code=TeamCode.id;
// console.log(team_code);
const memberData=await check_member(team_code);
console.log(memberData);

if(memberData.member_no< 3 || memberData.member_no==3)
{
const status={
      success:true,  
      teamName:memberData.teamName,
      membercount:memberData.member_no,
      player:memberData.email
}
console.log(status);
return status;


}



};
