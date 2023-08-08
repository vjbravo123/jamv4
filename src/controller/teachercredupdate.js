let client = require("../database/client_connector");
const getCollections = require('../function/db_subjects.js')
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

        const TeacherCreds = { Username: Username, Password: Password, Course: Course, Subcourse: Subcourse, Subject: Subject }

        console.log("creds");
        console.log(req.body);


        try {
            let dbName = "Credentials"
            let collectionName = "Teachers"

            const collectionReference = client.db(dbName).collection(collectionName);
            await collectionReference.insertOne(TeacherCreds);

            console.log(`${JSON.stringify(TeacherCreds)} is inserted in the "${dbName}" database in the "${collectionName}" collection.`);

            res.status(200).json({ value: true, msg: "data added sucessfully" });
        } catch (error) {
            console.error("Error while inserting query:", error);
            res.status(500).json({ success: false, error: "An internal server error occurred." });
        }
    }







}
module.exports = teachercredupdating;