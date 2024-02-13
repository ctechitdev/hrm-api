const express = require("express");
const login_route = require("./src/router/login_route");
const masterdata_route = require("./src/router/master_data");


const app = express();
const port = 5053;

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});


app.use('/autherize', login_route);
app.use('/masterdata', masterdata_route);
 

app.listen(port, () => console.log(`app listen on port ${port}`));
