import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { usermodel , contentmodel,Linkmodel} from "./db";
import { JWT_secret } from "./config";
import { auth } from "./auth";

const app = express();


app.post("api/v1/signup", async(req:any,res:any)=>{
   const username = req.body.username;
   const password = req.body.password;
   const hashpassword = bcrypt.hash(password,5);

   try {
      await usermodel.create({
         username:username,
         password:hashpassword
      })
      res.json({message:"you are singed up"});
   } catch (error) {
      res.status(411).json({
         message:"user already exists"
      })
   }
})




app.post("api/v1/signin", async(req:any,res:any)=>{
    const username = req.body.username;
    const password = req.body.password;
    const data =  await usermodel.findOne(username,password);
   if(data)
   {
     const Token = jwt.sign({id: data._id},JWT_secret);
     res.json({token:Token});
   }
  else{
   res.status("incorrect incredential");
  }
   

})

app.post("api/v1/content",auth,async(req:any,res:any)=>{
  const type = req.body.type;
  const link = req.body.link;
  
  const data = await contentmodel.create({type,link,userId:req.userId,tags:[]})
  res.json({message:"content added"})
})

app.get("api/v1/content",auth,async(req:any,res:any)=>{
   const userId = req.userId;
   const result = await contentmodel.find({userId:userId}).populate("userId","username");
   res.json({message:result})
    
})

app.delete("api/v1/content",auth,async(req:any,res:any)=>{
   const contentId = req.body.contentId;
   const userId = req.userId;

   await contentmodel.deleteMany({userId,contentId});
   res.json({message:"messgae delted"});
})
app.post("api/v1/brain/share",auth,async(req:any,res:any)=>{
     const userId = req.userId;
     const link = Linkmodel.create({userId:userId})
})

app.listen(3000 ,()=> {
   console.log("running on port");
});