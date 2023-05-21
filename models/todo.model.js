const mongoose=require("mongoose")


const todoSchema=mongoose.Schema({
    productName:{type:String,required:true},
    price:{type:Number,required:true},
    rating:{type:Number,required:true},
    authorID:{type:String,required:true},
    author:{type:String,required:true}
})

const TodoModel=mongoose.model("todo",todoSchema)
module.exports={
    TodoModel
}