const express = require("express");
const app = express();
const routertesting = require("./router")
const bodyParser = require('body-parser');
const cors = require('cors');


const PORT = process.env.PORT || 5000;

//cross-orign request handler
const corsOptions = {
  origin:'*',
  methods:['GET','POST'],
  allowedHeaders:['content-Type','Authorization']
};

//Middlewares:-----

//CORS-CROSS ORIGIN RESOURCE SHARING FOR USING BY ANOTHER DEVICES OR ORIGIN
app.use(cors(corsOptions));

//TO PARSE THE REQUEST BODY 
app.use(bodyParser.json());


//USING THE ROUTERS
app.use('/',routertesting);


app.listen(PORT,()=>{
    console.log("server running on port 5000");
})