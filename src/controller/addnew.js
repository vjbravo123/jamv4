const client = require("../database/client_connector");

const addNew = async (req, res, next) => {

    // Function to extract the year from the "Part" field
    function getYearFromPart(part) {
      const partMap = {
        I: 'I',
        II: 'II',
        III: 'III',
        IV: 'IV'
        // Add more mappings as needed
      };
  
      return partMap[part] || '';
    }
  
    const getYearSuffix = year => {
      if (year === 1) return 'st_year';
      if (year === 2) return 'nd_year';
      return 'rd_year';
    };

  const { data: stringData, year, subCourse, subjects } = req.body;

      // Remove leading spaces from the stringData
  const trimmedStringData = stringData.trim();

  // Split the data into rows and remove the header row
  const rows = trimmedStringData.split('\n');




  // Check if header row is present and remove it
  if (rows[0].startsWith('Sr. No.')) {
    rows.shift();
  }



  // Convert each row into an object
  const array = rows.map(row => {
    const [sno, , , , year, roll_no, ,name] = row.split('\t');
    return { sno: parseInt(sno), year: getYearFromPart(year), roll_no, name };
  });



    const yearSuffix = getYearSuffix(year);
    const subCourseWithoutSpaces = subCourse.replace(/\s/g, '');
 
   
    console.log(subCourse , subCourseWithoutSpaces);
    
    try {
      await client.connect();
      const db = client.db(`${subCourseWithoutSpaces}_${year}${yearSuffix}`);

      const studentsCollection = db.collection('students_details');
      const result = await studentsCollection.insertMany(array);
      console.log('Data inserted into students_details collection');

      for (const subject of subjects) {
        const subjectWithoutSpaces = subject.replace(/\s/g, '_');
        await db.createCollection(subjectWithoutSpaces);
        console.log(`Collection ${subjectWithoutSpaces} created`);
      }

      await db.createCollection('students_query');
      console.log('Collection students_query created');

      await db.createCollection('users_credentials');
      console.log('Collection users_credentials created');

      res.status(200).json({ message: 'Data added successfully' });
    } catch (err) {
      console.log('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data into MongoDB' });
    }
    //  finally {
    //   client.close();
    // }
  } 




module.exports = addNew;
