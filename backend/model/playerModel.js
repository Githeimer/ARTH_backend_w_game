import supabase from "../config/supabaseConnection.js";
import {GeneratePlayerCode} from '../utilities/playerCodeGenerate.js';

export const AddCode=async()=>{
    try {
        
        console.log("Add code is running");

        const {data:gamer, error} = await supabase
        .from('player')
        .select('*')
        .is('player_code',null)



        if (error) {
        console.error('Error fetching data with empty code', error);
        return{
            message:error.message,
            success:false
        }
          
        }
        
        else if(gamer.length===0)
        {
            return {
                message:"No row available with empty playerCode",
                success:true
            }

        }
        
        else {
           
            for (let i = 0; i < gamer.length; i++) 
            {
                
               
                const newCode =  await GeneratePlayerCode(); 
                
                const playerId=gamer[i].player_id;
                console.log(playerId);

                const { data:individual,error } = await supabase
                  .from('player')
                  .update({ player_code: newCode })
                  .eq('player_id', playerId)
                  .select('*') 

                // console.log(individual);                  
               
                if(error)
                {
                    // console.log('Error in updating playerCode in empty playerCode row')
                    return {
                        message:error.message,
                        success:false
                    }
                }
                else
                {              
                 return {
                    message:"Update Completed",
                    success:true
                }
                }    
            }
        }

    

    } catch (error) {
        console.log('Error in fetching Player Data for code insertion')
        return{
            success:false,
            message:error,
        }
    }
}


    









