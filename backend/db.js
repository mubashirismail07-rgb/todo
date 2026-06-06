const mongoose = require('mongoose');


async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongoDB connected");

  }

  catch(e){
    console.log("mongoDB connection failed");
    console.log(e)
    process.exit(1);

  }

}




const todoSchema = new mongoose.Schema({
  title : String,
  description : String,
  completed : Boolean
});

const Todo = mongoose.model('Todo',todoSchema);


module.exports = {
  Todo,
  connectDB
};


