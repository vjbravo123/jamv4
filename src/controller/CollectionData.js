const client = require("../database/client_connector");

// Custom date parsing function
function parseDate(dateStr) {
  const parts = dateStr.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Subtracting 1 to convert to 0-indexed month
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
}

const CollectionData = async (req, res, next) => {
  //   const client = new MongoClient(url);

  try {
    await client.connect();
    const dbName = req.params.dbName; // Get the database name from the request parameters
    const collectionName = req.params.collectionName; // Get the collection name from the request parameters

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const today = new Date();
    const currentMonth = today.getMonth() + 1; // Adding 1 because getMonth() returns 0-indexed months
    const currentYear = today.getFullYear();

    // Set the start and end dates for the current month
    const startDate = new Date(`${currentMonth}/1/${currentYear}`);
    const endDate = new Date(`${currentMonth + 1}/1/${currentYear}`);

    // Fetch attendance data for the current month
    const attendanceData = await collection.find().toArray();

    // Filter attendance data for the current month
    const filteredAttendanceData = attendanceData.filter((data) => {
      const dataDate = parseDate(data.date);
      return dataDate >= startDate && dataDate < endDate;
    });

    // Fetch student details
    const studentDetailsCollection = db.collection('students_details');
    const studentDetails = await studentDetailsCollection.find().toArray();

    let arr = [];

    for (let i = 0; i < studentDetails.length; i++) {
      let object = { sno: studentDetails[i].sno, name: studentDetails[i].name };
      let totalPresents = 0; // Variable to count total presents for each student

      for (let j = 0; j < filteredAttendanceData.length; j++) {
        if (filteredAttendanceData[j].roll_no === studentDetails[i].roll_no) {
          const attendanceStatus = filteredAttendanceData[j].attendance_status === 'Present' ? 'P' : 'A';
          const dateString = filteredAttendanceData[j].date;
          object[dateString] = `${dateString}${attendanceStatus}`;
          if (attendanceStatus === 'P') {
            totalPresents++; // Increment total presents for this student
          }
        }
      }

      object['Total_Present'] = totalPresents; // Add total presents to the object
      arr.push(object);
    }

    res.json(arr);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = CollectionData;
