const express=require("express")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const {UserModel}=require("../models/user.model")
const userRoute=express.Router()


userRoute.get("/",(req,res)=>{
    res.send("home")
})


//register
userRoute.post("/register",async(req,res)=>{
    const {name,email,password}=req.body;
     


    try {
       
        bcrypt.hash(password, 5, function(err, hash) {
            // Store hash in your password DB.
            if(hash){
                const user=new UserModel({name,email,password:hash})
                user.save()
                res.send({"msg":"Registration successful"})
            }
            
        });
    

        
    } catch (error) {
        res.send(error)
    }
})


//login
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await UserModel.findOne({email});
    // console.log(user);
    if(!user){
        try {
            bcrypt.compare(password, user.password, function(err, result) {
                if(result){
                    const token=jwt.sign({ authorID: user._id,author:user.name }, "admin",)
                        res.send({"msg":"Login successfull","token":token})
                      
                }
                else{
                    res.send({"msg":"Password incorrect"})
                }
             });
        
        } catch (error) {
            res.send(error)
        }

    }
    else{
        res.send({"msg":"user notfound!"})
    }
   
})
















module.exports={
    userRoute
}

