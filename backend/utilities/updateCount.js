import supabase from "../config/supabaseConnection.js";

export const check_member=async(teamCode)=>{

    try {
        let { data: player, error } = await supabase
        .from('player')
        .select("*")
        .eq('team_code', teamCode)

        if(error)
        {
            return({"message":error})
        }

        else{

            const number_player=player.length();






        }
        




      } catch (error) {
        console.error();
    }


    return 
}



