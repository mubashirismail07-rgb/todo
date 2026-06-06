const express = require('express');
const app = express();

app.use(express.json());

app.post('/todo',(req,res) => {
  res.send("express server is working successfully");
})

app.get('/todos',(req,res) => {

})

app.put('/completed',(req,res) => {
   
})




app.listen(3000,() => {
  console.log("server running on port 3000");
})