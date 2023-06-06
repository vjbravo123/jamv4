const ExcelJS = require('exceljs');
// const updateAttendanceStatus = require('./mongoupdate');

const excelmaker =async (present, data, res) => {

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('My Sheet');
  
  // Add column headers based on the keys in the first object of the data array
  // const headers = Object.keys(data[0]);
  const headers =["SNO","YEAR","ROLL_NO","NAME"];

  headers.push("Attendance Status");

  // Add a new column with today's date
  const today = new Date();
  headers.push("DATE");
  
  // const dateString = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  
  
  worksheet.addRow(headers);
  
  // Add data rows from the data array
  data.forEach((row) => {
    // const values = Object.values(row);
    const values =[row.sno,row.year,row.roll_no,row.name]

   // Add an empty cell for the "Attendance Status" column for now
   values.push("");

    // Add today's date to the new column
    values.push(dateString);

    worksheet.addRow(values);
  });
  
  // Add "Present" or "Absent" to the "Attendance Status" column based on the "SNO" values in the present array
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) {
      // Skip the header row
      return;
    }
    const snoValue = row.getCell(1).value; // Assuming SNO is in the first column
    const snoObject = present.find(obj => obj.sno ===snoValue);
    if (snoObject) {
      // SNO value exists in the present array, add "Present" in the corresponding cell in the "Attendance Status" column
      row.getCell(headers.length - 1).value = "Present";
    } else {
      // SNO value does not exist in the present array, add "Absent" in the corresponding cell in the "Attendance Status" column
      row.getCell(headers.length - 1).value = "Absent";
    }
  });
 
  workbook.xlsx.writeBuffer().then((buffer) => {
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=myFile.xlsx');
    res.send(buffer);
  });
  
};

module.exports = excelmaker;









// const ExcelJS = require('exceljs');

// const excelmaker = (present, res) => {
//   const workbook = new ExcelJS.Workbook();
//   const worksheet = workbook.addWorksheet('My Sheet');
//   worksheet.addRow(['SNO', 'Name', 'ROLLNO', 'YEAR', 'DATE']);
//   present.forEach((row) => {
//     worksheet.addRow([row.SNO, row.NAME, row.ROLLNO, row.YEAR, row.DATE]);
//   });
//   workbook.xlsx.writeBuffer().then((buffer) => {
//     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
//     res.setHeader('Content-Disposition', 'attachment; filename=myFile.xlsx');
//     res.send(buffer);
//   });
// };

// module.exports = excelmaker;


