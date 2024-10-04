// import supabase from "../config/supabaseConnection.js";

// export const add_count=async(teamCode)=>{

//     try {
//         let { data: player, error } = await supabase
//           .from('player')
//           .select('count')
//           .eq('team_code', teamCode)
//           .order('created_at', { ascending: false })
//           .limit(1);
    
//         if (error) {
//           console.error(error);
//         } else {
//           console.log(player);
          
//         }
//       } catch (error) {
        
//     }


//     // return 
// }



