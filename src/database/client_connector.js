const {MongoClient}  = require('mongodb');
const uri = require("./connection_string")



const client = new MongoClient(uri);

client.connect((err) => {
    if (err) throw err;
    console.log('MongoDB Connected!');
  });
  

module.exports = client;
