const client = require("../database/client_connector");

const attendance_datafunc=async(req,res)=>{
    const collection = client.db(req.params.db).collection("students_details");//students details*
    const data=await collection.find().toArray().then()
    await data.sort((a, b) => a.sno - b.sno);
    res.send(data);
    return data;
}
module.exports=attendance_datafunc;


/*
teachers dashboard------it has two options take attendance and students queries
1st---it sends request to /attendancetabledata (it gets attendance db->students_details)

the attendance component populate table with data and sends an object of roll_nos who are present





2nd---it sends request to /api/documents (it gets students_queries db->qurey collection)




*/