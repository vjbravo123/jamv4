let client = require("../database/client_connector");

const querydeleter = async (req,res)=>{
  const collection_reference = client.db(req.params.db).collection("students_query")
    const roll_no = req.body.roll_no;
    const filter = {roll_no:roll_no}
    await collection_reference.deleteOne(filter)
    let a = {ans:"delted bro"}
      res.send(a);
    }
module.exports=querydeleter;