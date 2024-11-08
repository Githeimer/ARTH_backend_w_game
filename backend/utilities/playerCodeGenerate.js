import random from 'random-string-alphanumeric-generator';

export  const GeneratePlayerCode = () => {

    const rawCode = random.randomAlphanumeric(5); 
    const s_character = '!@#$%&*';

    const array_number = Math.floor(Math.random() * s_character.length);
    
    const rawArray = Array.from(rawCode);
    
    const randomNumber = Math.floor(Math.random() * (rawArray.length + 1));
    
    rawArray.splice(randomNumber, 0, s_character[array_number]);
    
    const code = rawArray.join('');
    
    return code;
}

