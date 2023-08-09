const ExcelJS = require('exceljs');

const excelmaker = async (present, data, res) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('My Sheet');
  
    const headers = ["SNO", "YEAR", "ROLL_NO", "NAME"];
    headers.push("Attendance Status");
    headers.push("DATE");
  
    const today = new Date();
    const dateString = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  
    worksheet.addRow(headers);
  
    data.forEach((row) => {
      const values = [row.sno, row.year, row.roll_no, row.name];
      values.push("");
      values.push(dateString);
      worksheet.addRow(values);
    });
  
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      if (rowNumber === 1) {
        return;
      }
      const snoValue = row.getCell(1).value;
      const snoObject = present.find(obj => obj.sno === snoValue);
      if (snoObject) {
        row.getCell(headers.length - 1).value = "Present";
      } else {
        row.getCell(headers.length - 1).value = "Absent";
      }
    });
  
    const buffer = await workbook.xlsx.writeBuffer();
  
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=myFile.xlsx');
    res.status(200).send({ success: true, message: "Excel file generated successfully.", data: buffer });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "An error occurred while generating the Excel file." });
  }
};

module.exports = excelmaker;
