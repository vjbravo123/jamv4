const client = require("../database/client_connector");

const insertQueryToDB = async (req, res) => {
    try {
        const { name, email, roll_no, question } = req.body;

        const queryObject = { name, email, roll_no, question };
        const dbName = req.params.dbname;
        const collectionName = "students_query";

        const collectionReference = client.db(dbName).collection(collectionName);
        await collectionReference.insertOne(queryObject);

        console.log(`${JSON.stringify(queryObject)} is inserted in the "${dbName}" database in the "${collectionName}" collection.`);

        res.status(200).json({ success: true, message: "Query inserted successfully." });
    } catch (error) {
        console.error("Error while inserting query:", error);
        res.status(500).json({ success: false, error: "An internal server error occurred." });
    }
};

module.exports = insertQueryToDB;
