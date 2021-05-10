import JWT from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

const adminAuth = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];

        const isCustomAuth = token.length <  500;

        let decodedData;

        if(token && isCustomAuth){
            decodedData = JWT.verify(token, process.env.JWT_ADMIN_SECRET);

            req.adminId = decodedData?.id;
            next();
        }else{
            console.log("not an admin")
        }
        
    }catch(error){
        console.log(error);
    }
}

export default adminAuth;