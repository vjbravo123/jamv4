const client = require("../database/client_connector");

const attendanceFinder = async (req, res) => {
    try {
        const dbName = req.body.dbname;
        const subject = req.body.Subject;
        const rollNo = req.body.roll_no;

        const collection = client.db(dbName).collection(subject);
        console.log("Request body:", req.body);

        const result = await collection.find({ roll_no: rollNo }).toArray();

        let presentCount = 0;
        for (const record of result) {
            if (record.attendance_status === "Present") {
                presentCount++;
            }
        }

        console.log("Query result:", result);
        console.log("Present count:", presentCount);

        const responseObj = { attendance: presentCount, attendance_data: result };
        res.json(responseObj);
    } catch (error) {
        console.error("Error in attendanceFinder:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
};

module.exports = attendanceFinder;
