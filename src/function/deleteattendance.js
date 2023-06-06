//when this file is executed it will delete every document having todays datw 

const client = require("../database/client_connector");
const collection = client.db("attendance").collection("attendance");
const today = new Date();
const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
const deleter = async ()=>{
    const filter = { date:dateString }
   const result = await collection.deleteMany(filter);
    console.log("deleted",result);
}

deleter();