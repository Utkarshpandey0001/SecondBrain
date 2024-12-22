import jwt from "jsonwebtoken";
import { JWT_secret } from "./config";
import { NextFunction,Request,Response } from "express";

export const auth = (req:Request,res:Response,next:NextFunction)=>{
   const header = req.headers["authorization"];
   const response = jwt.verify(header as string,JWT_secret);
   if(response)
   {
    //@ts-ignore
     req.userId = response.id;
     next();
   }
   else{
    res.status(403).json({message:"wrong credentials"})
   }
}

