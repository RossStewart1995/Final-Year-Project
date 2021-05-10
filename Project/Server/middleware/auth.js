import JWT from "jsonwebtoken";

import dotenv from "dotenv"
dotenv.config();


const auth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length <  500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = JWT.verify(token, process.env.JWT_USER_SECRET);

            req.userId = decodedData?.id;
        }else{
            decodedData = JWT.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    }catch(error){
        console.log(error);
    }
}

export default auth;