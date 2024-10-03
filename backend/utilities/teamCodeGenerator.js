import {randomBytes} from "node:crypto"


export const GenerateTeamCode = () => {

  const number=Math.floor(Math.random()*(3-5)+5);
  console.log(number);

  const code=randomBytes(number).toString("hex");
  number=code;
  console.log(code);

  return code;
};

