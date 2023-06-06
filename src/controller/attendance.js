const updateAttendanceStatus = require("../function/updateAttendanceStatus");
const excelmaker = require('../function/excelmakeṛ')
const attendance_dataprovider = require("./attendance_data_provider");
const attendance = async (req ,res) => {
   
    const data =await attendance_dataprovider(req.params.db);

  
    const  attendanceData  = req.body;
 
      await updateAttendanceStatus(attendanceData ,req.params.db ,req.params.collection);
      excelmaker(attendanceData,data,res);
    }
module.exports=attendance;
