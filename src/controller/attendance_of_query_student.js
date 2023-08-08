const client = require("../database/client_connector");

const queryattendance = async (req, res) => {
    const collection = client.db(req.params.db).collection(req.params.collection)

    const roll_no = req.body.roll_no;

    let result = await collection.find({ roll_no: roll_no }).toArray();

    res.json({ attendance: result });
    

}
module.exports = queryattendance;