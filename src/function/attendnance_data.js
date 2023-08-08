const client = require("../database/client_connector");

//this function is used for getting all the students details for attendance taking purpose
const attendance_datafunc = async (req, res) => {
    try {
        //database will be specified in the params
        const collection = client.db(req.params.db).collection("students_details");

        //sorting the data for better displaying
        const data = await collection.find().sort({ sno: 1 }).toArray();

        
        res.status(200).json({ status: "success", data: data });
        return data;
    } catch (err) {
        console.log("Error:", err);
        res.status(500).json({ status: "error", error: "Internal Server Error" });
    }
};

module.exports = attendance_datafunc;
