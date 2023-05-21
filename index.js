const express=require("express")
const mongoose=require("mongoose")
const {connection}=require("./db")
const {userRoute}=require("./routes/user.routes")
const {todoRoute}=require("./routes/todo.routes")
require('dotenv').config()
const cors = require('cors')
const app=express()
 


app.use(cors())

app.use(express.json());
app.use("/user",userRoute)
// app.use(auth)
app.use("/todo",todoRoute)

app.listen(process.env.port,async()=>{
    try {
        await connection
console.log("db connected"); 
    } catch (error) {
        console.log(error);
    }
    console.log(`runong at ${process.env.port}`);
})


