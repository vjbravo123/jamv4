let client = require("../database/client_connector");
const getCollections = require('../function/db_subjects.js')
const db_data_inserter=require("../controller/insert_data_to_db");
const teachercredupdating = async (req, res) => {
    if (req.params.state === "subject") {
        console.log("thi ", req.params.collection);
        const result = await getCollections(req.params.collection)
        console.log(result);

        let data = { value: true, subjects: result }
        res.json(data);
    }
    else if (req.params.state === "updatingcreds") {
        
        const Username = req.body.Username;
        const Password = req.body.Password;
        const Course = req.body.Course;
        const Subcourse = req.body.Subcourse;
        const Subject = req.body.Subject;

       const obj = {Username:Username,Password:Password,Course:Course, Subcourse:Subcourse,Subject:Subject}
        
        console.log("creds");
        console.log(req.body);
       await db_data_inserter(obj,"Credentials" ,"users")
       res.json({value:true,msg:"data added sucessfully"})
    }

}
module.exports = teachercredupdating;