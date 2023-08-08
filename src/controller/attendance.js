const updateAttendanceStatus = require("../function/updateAttendanceStatus");
const attendance_dataprovider = require("./attendance_data_provider");
const attendance = async (req ,res) => {
    
    //This function provides data of the students details collection 
    const data =await attendance_dataprovider(req.params.db);
  
    //The data coming in the request body is the sno and roll_no of the present students 
    const  attendanceData  = req.body;
 
    
    await updateAttendanceStatus(attendanceData ,req.params.db ,req.params.collection ,data , res , req.params.period);
     
    }
module.exports=attendance;
