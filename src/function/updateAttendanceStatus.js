let client = require("../database/client_connector");
const excelmaker = require('../function/excelmakeṛ')
const updateAttendanceStatus = async (attendanceData, dbname, collectionname, data, res, period) => {
    //this array is used for storing the roll_no of present students which is coming from the attendanceData 
    let roll_no_arr = [];

    //This array is to store the objects of every student 
    //Format of the student objects is like this { sno: documents[i].sno, roll_no: documents[i].roll_no, date: dateString, attendance_status: "Present"/"Absent" }
    let docs = [];
    
    const collection = client.db(dbname).collection("students_details");
    const collection2 = client.db(dbname).collection(collectionname);

    let today = new Date();
    const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

    //If today's attendance is taken then don't take attendance
    let checkingdate_data = await collection2.findOne({ date: dateString })
    const resultExists = !!checkingdate_data;
  

    const takeattendance = async () => {
        //psuhing roll_numbers in the roll_no_arr
        for (let i = 0; i < attendanceData.length; i++) {
            let roll = attendanceData[i].roll_no;
            roll_no_arr.push(roll)
        }

        //Getting all the documents of the students_details collection
        let documents = await collection.find().toArray();


        for (let i = 0; i < documents.length; i++) {
            //iterating through the students_details documents
            //And checking if the roll_number of students_details is present in the roll_no_arr array then making obeject wiht present 
            //else making object with Absent
            if (roll_no_arr.includes(documents[i].roll_no)) {
                let obj = { sno: documents[i].sno, roll_no: documents[i].roll_no, date: dateString, attendance_status: "Present" }
                docs.push(obj)
                // await collection2.insertOne(obj);
            }
            else {
                let obj = { sno: documents[i].sno, roll_no: documents[i].roll_no, date: dateString, attendance_status: "Absent" }
                docs.push(obj)
            
            }
        }
           
            docs.sort((a, b) => a.sno - b.sno);
            await collection2.insertMany(docs);

           await excelmaker(attendanceData, data, res);
           
    }

    if (resultExists) {
        if (period == 'again') {
            takeattendance()
        }
        else{
            let obj = { message: "Today's Attendance is taken already" , val : true }
               return res.json(obj)
        }
    }

    else {
        takeattendance()
    }



}
module.exports = updateAttendanceStatus;