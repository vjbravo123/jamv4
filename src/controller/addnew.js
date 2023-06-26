// const { MongoClient } = require('mongodb');
const client = require("../database/client_connector");
// const url = 'mongodb+srv://escanor:vj1212@cluster0.9mok6ao.mongodb.net/?retryWrites=true';
// const client = new MongoClient(url, { useUnifiedTopology: true });

const addNew = async (req, res, next) => {

  // try {
  const { data: stringData, year, subCourse, subjects } = req.body;


  // Split the data into rows and remove the header row
  const rows = stringData.split('\n')


  // Check if header row is present and remove it
  if (rows[0].startsWith('Sr. No.')) {
    rows.shift();
  }



  // Convert each row into an object
  const result = rows.map(row => {
    const [sno, , , , year, roll_no, name] = row.split('\t');
    return { sno: parseInt(sno), year: getYearFromPart(year), roll_no, name };
  });

  // Function to extract the year from the "Part" field
  function getYearFromPart(part) {
    const partMap = {
      I: 'I',
      II: 'II',
      III: 'II',
      IV: 'II'
      // Add more mappings as needed
    };

    return partMap[part] || '';
  }

  console.log(result);


  //   const cleanedStringData = stringData.replace(/\n|\r|\s/g, '');
  //   const objectPattern = /{([^}]*)}/g;
  //   const objectMatches = cleanedStringData.match(objectPattern);
  //   const array = objectMatches.map(match => eval('(' + match + ')'));
  //   array.sort((a, b) => a.sno - b.sno);

  //   const yearSuffix = getYearSuffix(year);
  //   const subCourseWithoutSpaces = subCourse.replace(/\./g, '_').replace(/\s/g, '');

  //   try {
  //     await client.connect();
  //     const db = client.db(`${subCourseWithoutSpaces}_${year}${yearSuffix}`);

  //     const studentsCollection = db.collection('students_details');
  //     const result = await studentsCollection.insertMany(array);
  //     console.log('Data inserted into students_details collection');

  //     for (const subject of subjects) {
  //       const subjectWithoutSpaces = subject.replace(/\s/g, '_');
  //       await db.createCollection(subjectWithoutSpaces);
  //       console.log(`Collection ${subjectWithoutSpaces} created`);
  //     }

  //     await db.createCollection('students_query');
  //     console.log('Collection students_query created');

  //     await db.createCollection('users_credentials');
  //     console.log('Collection users_credentials created');

  //     res.status(200).json({ message: 'Data added successfully' });
  //   } catch (err) {
  //     console.log('Error inserting data:', err);
  //     res.status(500).json({ error: 'Error inserting data into MongoDB' });
  //   } finally {
  //     client.close();
  //   }
  // } catch (err) {
  //   console.error('Error inserting data:', err);
  //   res.status(500).json({ error: 'Error inserting data into MongoDB' });
  // }
};

// const getYearSuffix = year => {
//   if (year === 1) return 'st_year';
//   if (year === 2) return 'nd_year';
//   return 'rd_year';
// };

module.exports = addNew;
