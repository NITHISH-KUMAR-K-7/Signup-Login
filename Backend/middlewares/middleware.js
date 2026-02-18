

import Users from "../model/usermodel.js";

import jwt from 'jsonwebtoken'


export const verifyToken = async (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        console.log(authHeader)

        if(!authHeader){
            return res.status(401).json({ message: "No token" })
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const verified = jwt.verify(token, process.env.SECRET_KEY);

        const user = await Users.findById(verified.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
    
        req.user = user;
        next();

    }catch(error){
        res.status(401).json({ message: "Invalid token" })
    }
}
