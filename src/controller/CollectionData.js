const client = require("../database/client_connector");

// Custom date parsing function
function parseDate(dateStr) {
  const parts = dateStr.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

const CollectionData = async (req, res, next) => {
  try {
    await client.connect();
    const dbName = req.params.dbName;
    const collectionName = req.params.collectionName;
    const currentMonth = parseInt(req.query.month); // Get currentMonth from the query

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const startDate = new Date(`${currentMonth + 1}/1/${new Date().getFullYear()}`);
    const endDate = new Date(`${currentMonth + 2}/1/${new Date().getFullYear()}`);

    const attendanceData = await collection.find().toArray();

    const filteredAttendanceData = attendanceData.filter((data) => {
      const dataDate = parseDate(data.date);
      return dataDate >= startDate && dataDate < endDate;
    });

    const studentDetailsCollection = db.collection('students_details');
    const studentDetails = await studentDetailsCollection.find().toArray();

    let studentAttendanceMap = new Map();

    for (let i = 0; i < filteredAttendanceData.length; i++) {
      const data = filteredAttendanceData[i];
      const rollNo = data.roll_no;
      const attendanceStatus = data.attendance_status;
      const dateString = data.date;

      if (!studentAttendanceMap.has(rollNo)) {
        studentAttendanceMap.set(rollNo, new Map());
      }

      const dateAttendanceMap = studentAttendanceMap.get(rollNo);
      if (dateAttendanceMap.has(dateString)) {
        const existingStatus = dateAttendanceMap.get(dateString);
        if (existingStatus.includes('A') && attendanceStatus.includes('P')) {
          dateAttendanceMap.set(dateString, 'AP');
        } else if (existingStatus.includes('P') && attendanceStatus.includes('A')) {
          dateAttendanceMap.set(dateString, 'PA');
        } else if (existingStatus.includes('A') && attendanceStatus.includes('A')) {
          dateAttendanceMap.set(dateString, 'AA');
        } else if (existingStatus.includes('P') && attendanceStatus.includes('P')) {
          dateAttendanceMap.set(dateString, 'PP');
        }
      } else {
        dateAttendanceMap.set(dateString, attendanceStatus);
      }
    }

    let arr = [];
    for (let i = 0; i < studentDetails.length; i++) {
      const studentDetail = studentDetails[i];
      const rollNo = studentDetail.roll_no;
    
      const dateAttendanceMap = studentAttendanceMap.get(rollNo);
      if (!dateAttendanceMap) continue;
    
      let object = { sno: studentDetail.sno, name: studentDetail.name };
      let totalPresents = 0;
      let totalAbsents = 0;
    
      let dateStatus = {}; // Store the combined status for each date
    
      for (const [dateString, status] of dateAttendanceMap.entries()) {
        if (status.includes('P')) {
          totalPresents++;
        }
        if (status.includes('A')) {
          totalAbsents++;
        }
    
        if (!dateStatus[dateString]) {
          dateStatus[dateString] = status;
        } else {
          const existingStatus = dateStatus[dateString];
          if (existingStatus.includes('P') && status.includes('A')) {
            dateStatus[dateString] = 'PA';
          } else if (existingStatus.includes('A') && status.includes('P')) {
            dateStatus[dateString] = 'PA';
          } else if (existingStatus.includes('A') && status.includes('A')) {
            dateStatus[dateString] = 'AA';
          } else if (existingStatus.includes('P') && status.includes('P')) {
            dateStatus[dateString] = 'PP';
          }
        }
      }
    
      for (const [dateString, status] of Object.entries(dateStatus)) {
        object[dateString] = status;
      }
    
      let overallStatus = '';
      if (totalPresents > 0 && totalAbsents > 0) {
        overallStatus = 'PA';
      } else if (totalPresents > 0) {
        overallStatus = 'P';
      } else if (totalAbsents > 0) {
        overallStatus = 'A';
      }
    
      object['Total_Present'] = totalPresents;
      object['Total_Absent'] = totalAbsents;
      object['Overall_Status'] = overallStatus;
      arr.push(object);
    } 
    

  
    res.json(arr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = CollectionData;
