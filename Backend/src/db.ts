import mongoose, { Schema , model} from "mongoose";

 async function connect()
 {
   await mongoose.connect("mongodb+srv://utkarshrajpandey0001:Govind2003@cluster0.sbptj.mongodb.net/Brain");
   console.log("database is connected");
 } 
const userschema =  new Schema({
    username:{type:String , unique:true},
    password: String
});
export const usermodel = model("User",userschema);

const contentschema = new Schema ({
    type:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId, ref:'Tag'}],
    userId:{type:mongoose.Types.ObjectId ,ref:'User', required:true}

})


export const contentmodel = model("content",contentschema);

const linkschema = new Schema({
  userId:{type:mongoose.Types.ObjectId,ref:"Link",required:true},
  link:String
})

export const Linkmodel = model("link" , linkschema);