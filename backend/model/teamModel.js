import supabase from "../config/supabaseConnection.js";
import { GenerateTeamCode } from "../utilities/teamCodeGenerator.js";

export const CreateTeam = async (TeamDetails) => {
  try {
    const { teamName, team_leader_email } = TeamDetails;

    

    const TeamCode = GenerateTeamCode();
    
    const teamData = {
      team_code: TeamCode,
      team_name: teamName,
      team_leader_email: team_leader_email,
    };

   

    const { data, error } = await supabase
      .from("team")
      .insert(teamData)
      .select("count"); // Make sure to select data to get back the inserted row
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
  .order('created_at',{ascending:false})

  
  
  if(error)
  {
    console.log('Error Detected')
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

export const ViewTeamStatus = async () => {
//   //interaction with supabase to check count of members;
//   //also send the team name, members details in certain object format
  
// try {
//   let { data: team, error } = await supabase
//   .from('team')
//   .select("*")
//   .eq('team_code', TeamCode);

//   if(error)
//   {
//     console.log(`Error in retrieving data:${error.message}`);
//   }

//   else{
//     const number=data.length;
//     const team_name=data[0].team_name;
//     const member=[];
    
//     data.forEach(element => {
//       const email=element.team_leader_email;
//       member.push(email);
//   });

  
//     if(number==3)
//     {
//       const responseData = {
//       teamName: team_name,
//       memberCount: number,
//       members: {
//         player1: member[0],
//         player2: member[1],
//         player3: member[2],
//       },
//     };

//     return responseData;

//     }
    
//     else if (number< 3)
//     {

//     }
    
    
// }



// } catch (error) {
  
//   console.log('Error');
//   return{
//     success:false,
//     message:error.message
//   };

//  }

  
  
  



};
