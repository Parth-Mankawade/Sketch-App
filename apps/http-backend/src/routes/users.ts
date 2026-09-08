import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const userRouter = express.Router();
import bcrypt from "bcryptjs";
import z, { config } from "zod";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { CreateUserSchema , SigninSchema , CreatRoomSchema} from "@repo/common/types";



userRouter.post("/signup"  ,async (req , res)=>{

    const userbody = req.body;

    const bodycheck = CreateUserSchema.safeParse(userbody);
    if(!bodycheck.success){
        res.status(401).send({
            message : "Invalid Credentials"
        });
    }

    const [username,pwd] = userbody;

    const checkuserexist = await UserModel.findOne({
        username : username
    });

    const id = checkuserexist._id;

    const hashedpwd = await bcrypt.hash(pwd,5);

    
    const token = jwt.sign({
        id
    } , JWT_SECRET);

});

userRouter.post("/signin" , async (req , res) =>{

     const userbody = req.body;

    const bodycheck = SigninSchema.safeParse(userbody);
    if(!bodycheck.success){
        res.status(401).send({
            message : "Invalid Credentials"
        });
    }
        
});

userRouter.post("/creat-room",authMiddleware ,async (req,res)=>{
    //db call
    const data = CreatRoomSchema.safeParse(req.body);
    if(!data.success){
        res.json({
            message : "Invalid"
        });
        return;
    }



    res.json({
        roomId : "123"
    })
});
