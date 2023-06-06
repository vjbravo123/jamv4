const db_data_inserter=require("../controller/insert_data_to_db");
const inserting_query_to_db = async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const roll_no = req.body.roll_no;
    const question = req.body.question;
    
    let a = {name:name , email:email ,roll_no:roll_no,question:question};

    await db_data_inserter(a ,req.params.db,"students_query")
    res.send({value:true})
  }
  module.exports=inserting_query_to_db;