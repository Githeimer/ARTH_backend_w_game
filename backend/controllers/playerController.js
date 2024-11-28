import {AddCode} from "../model/playerModel.js";
import {updatePlayerInfo} from '../model/gameModel.js'



export const codeUpdate=async(req,res)=>{
try {
const additionCode= await  AddCode();
await updatePlayerInfo();

  if(additionCode.success)
  {
    return res
    .status(200)
    .json({
      success:additionCode.success,
      message:additionCode.message
    })
  }

  else{
    return res
    .status(500)
    .json({
      success:additionCode.success,
      message:additionCode.message
    })
  }



 }
  catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Server error: " + error.message, success: false });
    }
}
