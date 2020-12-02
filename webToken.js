const jwt = require("jsonwebtoken");

let generateWebToken = async() => {
    let user = {
        id : "8296692254",
        name : "shashank"
    } 
    let token = await jwt.sign(user,"shashankgbshashi");

    let verify = await jwt.verify(token,"shashankgbshashi");
    console.log(verify);
    
    console.log(token);
}

generateWebToken();