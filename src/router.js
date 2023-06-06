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
// const attendance_dataprovider = require("./controller/attendance_data_provider")
const Router = express.Router();
const addnew= require('./controller/addnew')
const attendance_dataprovider = require("./login validation/attendance_finder")


Router.get('/',logger)
Router.post('/login/:collection',cred_check);
Router.post('/adminlogin/:collection',cred_check);
Router.get('/api/documents/:db',queries );

Router.post('/queryattendance/:db/:collection',queryattendance)

Router.post('/querydelete/:db',querydelete)
Router.post('/queriedattendancechange/:db/:collection',queried_attendance_update);


Router.post('/studentslogin/:collection',cred_check)
Router.post('/studentAttendancePage', attendance_dataprovider)

Router.post('/submit-form', signup);

Router.post('/students-queries/:db/',inserting_query_to_db);
  
Router.post('/attendance/:db/:collection',attendance);

Router.get("/attendancetabledata/:db/:collection",attendance_datafunc)

Router.get("/dataviewer",attendance_datafunc);

Router.post('/api/addnew',addnew)


module.exports=Router;