const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors'); 
const { createTodo,updateTodo } = require("./types");
const { connectDB,Todo } = require('./db');
const { id } = require('zod/v4/locales');


connectDB();

app.use(express.json());
app.use(cors());

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
      completed : false 
    })
    console.log("todo added")

  }
  catch(e){
    return res.status(500).json({
      msg : "internal server error"
    });

  }
  res.json({
    msg : "done"
  });

})

app.get('/todos',async (req,res) => {
  try{

    const allTodos = await Todo.find({});
    return res.json({
      todos : allTodos
    });

  }
  
  catch(e){
    return res.status(500).json({
      msg : "internal server erroe"
    });

  }

})

app.put('/completed',async (req,res) => {
  const updatePayLoad = req.body;
  const response = updateTodo.safeParse(updatePayLoad);
  if(!response.success){
     return res.status(411).json({
      msg : "wrong input"
     });
  
  }
  await Todo.updateOne({
    _id : req.body.id,
  },{
    completed : true
  });
  res.json({
    msg : "updated todo"
});



   
})




app.listen(3000,() => {
  console.log("server running on port 3000");
})