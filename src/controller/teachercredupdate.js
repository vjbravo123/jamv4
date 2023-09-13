let client = require("../database/client_connector");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Jam@v4'
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

        const salt = await bcrypt.genSalt(10)
        let securePass = await bcrypt.hash(Password,salt)
        const TeacherCreds = { Username: Username, Password: securePass, Course: Course, Subcourse: Subcourse, Subject: Subject }

        console.log("creds");
        console.log(req.body);


        try {
            let dbName = "Credentials"
            let collectionName = "users"

            const collectionReference = client.db(dbName).collection(collectionName);
            const CreatedUser= await collectionReference.insertOne(TeacherCreds);
            console.log(CreatedUser);

            console.log(`${JSON.stringify(TeacherCreds)} is inserted in the "${dbName}" database in the "${collectionName}" collection.`);

            res.status(200).json({ value: true, msg: "data added sucessfully" });
        } catch (error) {
            console.error("Error while inserting query:", error);
            res.status(500).json({ success: false, error: "An internal server error occurred." });
        }
    }







}
module.exports = teachercredupdating;