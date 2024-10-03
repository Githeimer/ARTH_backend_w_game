export const GenerateTeamCode = () => {
  // Generate 3 random digits using Math.random
  const randomDigits = Math.floor(100 + Math.random() * 900); // Ensures it's a 3-digit number

  // Concatenate "TEAM" with the random digits
  const code = "TEAM" + randomDigits;

  return code;
};
