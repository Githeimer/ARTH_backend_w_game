import supabase from "../config/supabaseConnection";
import {AddCode} from "../model/playerModel";

export const playerinfo=async()=>{
try {
    
    const {playerCode,level,time}=req.body;
    const {coordinates_x,coordinates_y,region}=req.body;

    AddCode();

    


    





} catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error: " + error.message, success: false });
    }
}
