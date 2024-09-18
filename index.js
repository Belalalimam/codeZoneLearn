const express = require("express");
const usersRouter = require('./routes/users.route') 


const app = express();

app.use(express.json());


app.use('/api/users', usersRouter)


app.listen(3000, () => {
  console.log("server is running on port 4000");
});
