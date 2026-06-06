const express = require('express');
require('dotenv').config();
const app = express();
const { createTodo,updateTodo } = require("./types");
const { connectDB,Todo } = require('./db');
const { id } = require('zod/v4/locales');


connectDB();

app.use(express.json());

app.post('/todo',async (req,res) => {
  const createPayLoad = req.body
  const response = createTodo.safeParse(createPayLoad);

  if (!response.success){
    return res.status(411).json({
      msg  : "you sent the wrong inputs"
    })
  }
  // put it in mongoDB
  const title = req.body.title;
  const description = req.body.description;
  const id = req.body.id
  try{
    await Todo.create({
      title : title,
      description : description,
      id : id
    })
    console.log("todo added")

  }
  catch(e){
    return res.status(500).json({
      msg : "internal server error"
    });

  }
  res.send("done");

})

app.get('/todos',(req,res) => {
  

})

app.put('/completed',(req,res) => {
  const id = req.body.id;
  const response = updateTodo.safeParse(id);
  if(!response.success){
     return res.status(411).json({
      msg : "wrong input"
     });
  // update 
  }
   
})




app.listen(3000,() => {
  console.log("server running on port 3000");
})