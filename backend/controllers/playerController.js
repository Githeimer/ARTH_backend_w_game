import {AddCode} from "../model/playerModel.js";
import supabase from "../config/supabaseConnection.js";


export const playerinfo=async(req,res)=>{
try {
  
  // Retrieving demo data
  // let { data, error } = await supabase
  // .from('game_data')
  // .select('*')

  // if(data)
  // {
  //  return res.json({
  //   data
  //   })
  //  }
  //  else{
  //   return res.json({
  //     message:error.message
  //   })
  //  }

  
    // Insertion of playercode into player-table with empty value
    // const insert=await AddCode();
    

    const {playerCode,level,time}=req.body;
    const {coordinates_x,coordinates_y,region}=req.body;

   


} catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error: " + error.message, success: false });
    }
}
