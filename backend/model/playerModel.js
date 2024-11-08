import supabase from "../config/supabaseConnection.js";
import {GeneratePlayerCode} from '../utilities/playerCodeGenerate.js';

export const AddCode=async()=>{
    try {
    
        const {data, error} = await supabase
        .from('scoreboard')
        .select('*')
        .is('code',null);

        if (error) {
        console.error('Error fetching data with empty code', error);
        return{
            message:error.message,
            success:false
        }
          
        } else {
            for (let i = 0; i < data.length; i++) 
            {
                const player = data[i];
                const newCode = GeneratePlayerCode(); 
        
                const { data,error } = await supabase
                  .from('player')
                  .update({ code: newCode })
                  .eq('id', player.id); 
               
                if(error)
                {
                    console.log('Error in updating playerCode in empty playerCode row')
                    return {
                        message:error,
                        success:false
                    }
                }
                else
                {
                    console.log('Update Completed');
                }    
            }
    }

    } catch (error) {
        console.log('Error in fetching Scoreboard for code insertion');
        return{
            success:false,
            message:error,
        }
    }

}