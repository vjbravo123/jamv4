const cred_check = require("./login validation/cred_check")
const signup = require("./login validation/signup")
const queries = require('./controller/queries')
const logger = require('./controller/logger')
const queried_attendance_update = require('./controller/attendance_update')
const querydelete = require('./controller/querydeleter')
const attendance = require('./controller/attendance')
const inserting_query_to_db = require('./controller/queryinserter')
const queryattendance = require('./controller/attendance_of_query_student')
const attendance_datafunc = require('./function/attendnance_data')
const express = require("express");
const Router = express.Router();
const addnew = require('./controller/addnew')
const attendance_finder = require("./login validation/attendance_finder")
const teachercredupdating = require("./controller/teachercredupdate")
const CollectionData = require("./controller/CollectionData")

//Route 1
Router.get('/', logger)

//Route 2 Teacher_login page
//The same route is also used for the teacher login to make their credentials the first time
Router.post('/login/:collection', cred_check);

//Route 3 this is for the take attendance button in the teacher dashboard componenet
Router.get("/attendancetabledata/:db/:collection", attendance_datafunc)

//Route 4 this is for the students queries button in the teachers dashboard page
Router.get('/api/documents/:db', queries);

//Route 5 this is for the Attendance viewer page Useeffect
Router.get('/api/collections/:dbName/:collectionName',CollectionData)

//Route 6 this is for taking the attendance
Router.post('/attendance/:db/:collection/:period', attendance);

//Route 7 this is for checking the attendance of the students who raised the query
Router.post('/queryattendance/:db/:collection', queryattendance)

//Route 8 this is for deleting the query in the querypage
Router.post('/querydelete/:db', querydelete)

//Route 9 this is for changing the attendance of the student that send the Query
Router.post('/queriedattendancechange/:db/:collection', queried_attendance_update);


//Route 10 This route is for the students login
Router.post('/studentslogin/:collection', cred_check)


//Route 11 This route takes the database name and the subject name(collection name) from request body and returns the attendance data as the response
Router.post('/studentAttendancePage', attendance_finder)


//Route 12 This route is for inserting a students query to students query collection
Router.post('/students-queries/:dbname/', inserting_query_to_db);


//Route 13 This route is for the students signup
Router.post('/submit-form', signup);


//Route 14 This route is for the login of all teacher for the first time and then complete the signup process
Router.post('/teachercredlogin/:collection', cred_check);

//Route 15 This route is for the adding teacher first time signup details 
Router.post("/api/subjects/:collection/:state", teachercredupdating);


//Route 16 this is for the admin login
Router.post('/adminlogin/:collection', cred_check);


//Route 17 this route is to add student details of a particular course
Router.post('/api/addnew', addnew)
 




module.exports = Router;