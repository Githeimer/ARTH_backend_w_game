import supabase from "../config/supabaseConnection.js";

export const check_member = async (teamCode) => {
  try {
    console.log(teamCode);
    const { data: player, error } = await supabase
      .from('player')
      .select("*")
      .eq('team_code', teamCode);

    // console.log(data);
    console.log(player);
    console.log(error);
      
    if (error) {
      return { message: error };
    }

    const number_player = player.length;
    const email=[];
    player.forEach((member)=>{
        email.push(member.email)
    }
    );
    console.log(email);

  

    if (number_player < 3) {
      return {
        success: true,
        member_no: number_player,
        email:email,
        teamName:player[0].team_name
        
      };
    } 
    else {
      return {
        success: false,
        member_no: number_player,
        email:email,
        teamName:player[0].team_name
      };
    }
  } catch (error) {
    console.error(error);
    return { message: error };
  }
};