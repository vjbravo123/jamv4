let client = require("../database/client_connector");

const updateAttendanceStatus = async (attendanceData,dbname,collectionname) => {
    let b=[];
    let docs = [];
    const collection = client.db(dbname).collection("students_details");
    const collection2 = client.db(dbname).collection(collectionname);
    

    for (let i = 0; i < attendanceData.length; i++) {
        let roll = attendanceData[i].roll_no;
        b.push(roll)   
    }


let today = new Date();
const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
let documents = await collection.find().toArray();

for (let i = 0; i < documents.length; i++) {
    if( b.includes( documents[i].roll_no)){
        let obj = {sno: documents[i].sno , roll_no:documents[i].roll_no , date : dateString , attendance_status :"Present" }
        docs.push(obj)
        // await collection2.insertOne(obj);
    }
    else{
        let obj = { sno: documents[i].sno ,roll_no:documents[i].roll_no , date : dateString , attendance_status :"Absent" }
        docs.push(obj)
        // await collection2.insertOne(obj);
    }
}
console.log(docs.length)
docs.sort((a, b) => a.sno - b.sno); 
await collection2.insertMany(docs);

}
module.exports = updateAttendanceStatus;