import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

export async function authMiddleware(req: Request ,res : Response , next : NextFunction){
    const authBody = req.headers["authorization"] ?? "";

    if(!authBody){
        res.status(401).json({
            message : "Invalid Credentials"
        });
        return;
    }

    const token = authBody.split(" ")[1];

    if(!token){
        res.status(401).json({
            message : "invalid credentials"
        });
    }

    const decoded = jwt.verify(token , JWT_SECRET);

    if(decoded){
        req.userId = decoded.userId;
        next();
    }else{
        res.status(403).json({
            message : "Unauthorised"
        });
        return;
    }
}