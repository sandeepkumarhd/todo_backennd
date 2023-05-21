const express=require("express")
const {TodoModel}=require("../models/todo.model")
const {auth}=require("../middlewares/auth.middleware")
const todoRoute=express.Router()



//todoo post
todoRoute.use(auth)
todoRoute.post("/add",async(req,res)=>{
    console.log(req.body);

    try {
        const todo=new TodoModel(req.body)
        todo.save()
        res.send({"msg":"new todo added"})
        
    } catch (error) {
        res.send(error)
    }

})

//todo read

todoRoute.get("/",async(req,res)=>{
    const {authorID}=req.body
    try {
        const todo=await TodoModel.find({authorID})
        res.send(todo)
        
    } catch (error) {
        res.send(error)
    }
})

//todo update
todoRoute.patch("/update/:id", async (req, res) => {
    let { id } = req.params;
    const todo=await TodoModel.findOne({_id:id})
    try {
  
        if(req.body.authorID==todo.authorID){
  
          await TodoModel.findByIdAndUpdate({ _id: id },req.body);
          res.status(200).send({ "msg": `todo ${id} has been updated` });
        }else{
          res.status(400). send({"msg":"You are not authenticate!"})
        }
  
  
    } catch (error) {
      res.status(404).send(error);
    }
  });



  //delete a data from the cart
todoRoute.delete("/delete/:id", async (req, res) => {
    let { id } = req.params;
    const todo=await TodoModel.findOne({_id:id})
    try {
  
        if(req.body.authorID==todo.authorID){
  
          await TodoModel.findByIdAndDelete({ _id: id });
          res.status(200).send({ "msg": `todo ${id} has been deleted` });
        }else{
          res.status(400). send({"msg":"You are not authenticate!"})
        }
  
  
    } catch (error) {
      res.status(404).send(error);
    }
  });


module.exports={
    todoRoute
}