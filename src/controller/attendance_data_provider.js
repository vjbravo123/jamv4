const client = require("../database/client_connector");

const attendance_dataprovider=async(dbname)=>{
    const collection = client.db(dbname).collection("students_details");

    const data=await collection.find().toArray().then()
    data.sort((a, b) => a.sno - b.sno);
    return data;
}
module.exports=attendance_dataprovider;