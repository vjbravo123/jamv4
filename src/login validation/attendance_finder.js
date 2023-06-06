const client = require("../database/client_connector");


const attendance_finder = async (req ,res) => {

    const collection = client.db(req.body.dbname).collection(req.body.Subject)
    console.log(req.body);
    let present_count = 0;

    let result = await collection.find({ roll_no:req.body.roll_no }).toArray();

    for (let i = 0; i < result.length; i++) {
        if (result[i].attendance_status === "Present") {
            present_count++;
        }
    }

    console.log(result);
    console.log(present_count);

    // let obj = { present_count: present_count, result: result }

    let obj ={attendance:present_count ,attendance_data:result }
    res.json(obj);
}
module.exports=attendance_finder;


