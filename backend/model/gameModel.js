import supabase from "../config/supabaseConnection.js";

export const updatePlayerData = async (playerCode, playerGameData) => {
  try {
    const { data, error } = await supabase
      .from("game_data")
      .update(playerGameData)
      .eq("player_code", playerCode)
      .select();

    if (error) {
      console.error("Error Updating Player Data:", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      message: "Player data updated successfully",
      data,
    };
  } catch (error) {
    console.error("Unexpected Error:", error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const findPlayerByCode = async (PlayerCode) => {
  try {
    const { data, error } = await supabase
      .from("game_data")
      .select("*")
      .eq("player_code", PlayerCode);

    if (error) {
      console.error("Error Finding Player", error.message);
      return {
        success: false,
        message: error.message,
      };
    }

    if (data && data.length > 0) {
      return {
        success: true,
        message: data,
      };
    } else {
      return {
        success: false,
        message: "Player code is incorrect or does not exist.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};

export const getPlayerData = async (PlayerCode) => {
  try {
    const playerData = await findPlayerByCode(PlayerCode);

    if (!playerData.success) {
      return {
        success: false,
        message: playerData.message,
      };
    }

    const data = playerData.message[0];

    if (data) {
      return {
        success: true,
        message: data,
      };
    }

    return;
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
};

export  const updatePlayerInfo=async(res,req)=>{


const targetCodeId=async(player)=>{

    const code=player.player_code;
    const id=player.player_id;

    let { data: gamers, error0 } = await supabase
    .from('game_data')
    .select('*')
    
    if(error0)
    {
      return{
        message:error0.message,
        success:false
      }
    }

    else
    {
      const bool=gamers.every(individual=>{
      individual.player_id!=id && individual.player_code!=code
      })
    
    if(!bool)
    {
      const { data, error } = await supabase
      .from('game_data')
      .insert([
      { "player_code":String(code), "player_id": id },
      ])
      .select("*")

      if(error)
      {
        return {
          message:error.message,
          success:false
        }
      }

      else
      {
        return {
          message:"Successfully Updated player_code in game_data",
          success:true
        }
      }
      

    }

    }


    }
 

// empty id field with code empty
//  const targetId=async(player)=>{

//     const code=player.player_code;
//     const id=player.player_id;
    
//     let { data: gamers, error0 } = await supabase
//     .from('game_data')
//     .select('*')


//     if(error0)
//     {
//       return{
//         message:error0.message,
//         success:false
//       }
//     }
//     else
//     {   
//       const bool=gamers.every((individual,i)=>{
//        individual.player_code===code && !individual.player_id
//     })

//     console.log(bool);
//     if(bool){
     
//      const { data, error } = await supabase
//     .from('game_data')
//     .update({"player_id": id})
//     .eq('player_code', code)
//     .select('*')
    
//     if(data)
//     {
//       console.log("Data in targetId",data)
//     }
//     else{
//       console.log(error)
//     }
  
  
//   }

    
    
//   }
//    return 0;
//   }
 

// empty code feild with code as empty 
// const targetCode=async(player)=>{

//   const code=player.player_code;
//   const id=player.player_id;
    
//     let { data: gamers, error0 } = await supabase
//     .from('game_data')
//     .select('*')

//     if(error0)
//     {
//       return{
//         message:error0.message,
//         success:false
//       }
//     }
//     else
//     {   
//       const bool=gamers.every((individual,i)=>{
//         !individual.player_code && individual.player_id===id;
//     })

//     console.log(bool);

//     if(bool){
     
//     const { data, error } = await supabase
//     .from('game_data')
//     .update({"player_code": code})
//     .eq('player_id', id)
//     .select('*')
    
//       if(data)
//       {
//         console.log("TargetCode",data);
//       }
//       else{
//         console.log(error);
//       }
  
  
//   }
    
//   }
//    return 0;
// }
 
  
  

let { data: player, error2 } = await supabase
  .from('player')
  .select('player_code, player_id')

  
if(error2)
{
  return{
    message:error2.message,
    success:false
  }
}

else{
  for(var i=0;i<player.length;i++)
  {

    await targetCodeId(player[i]);


  }

}
  

  






}

