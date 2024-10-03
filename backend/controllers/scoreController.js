import supabase from "../config/supabaseConnection.js";

export const update=async()=>{
    try {
    const { data, error } = await supabase
    .from('Scoreboard')
    .select('*')
    console.log(data)
    } catch (error) {
        console.log(error);
    }
};

