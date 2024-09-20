const express = require("express");
const usersRouter = require('./routes/users.route'); 
require('dotenv').config()
const mongoose = require('mongoose')

const url =  process.env.MONGO_URL;

 

mongoose.connect(url).then(
  () => console.log('connected to database'),
)



const app = express();

app.use(express.json());


app.use('/api/users', usersRouter)


app.listen(process.env.PORT || 3000, () => {
  console.log("server is running on port 4000");
});
