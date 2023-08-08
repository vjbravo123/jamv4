const { ObjectId } = require("mongodb");
const client = require("../database/client_connector")
// const db_data_inserter = require('../controller/insert_data_to_db');

const signup = async (req, res) => {
    const { year, subCourse } = req.body;
    const name = req.body.username;
    const password = req.body.password;
    const roll_no = req.body.roll_no;
    const idToSearchFor = req.body.id;
    
    
    const yearSuffix = getYearSuffix(year);
    const subCourseWithoutSpaces = subCourse.replace(/\./g, '_').replace(/\s/g, '');
    let collection_reference = client.db(`${subCourseWithoutSpaces}_${year}${yearSuffix}`).collection('students_details');
    
    let obj = { Username: name, Password: password, roll_no: roll_no ,subCourse:`${subCourseWithoutSpaces}_${year}${yearSuffix}` };
    try {

        // Search for the ID in the collection
        let result = await collection_reference.findOne({ _id: new ObjectId(idToSearchFor) });

        // Check if a matching document was found
        if (result) {
            console.log(`ID '${idToSearchFor}' exists in the collection`);
            console.log(result)
            console.log("id found true");
            
            await db_data_inserter(obj,"Credentials","students");
     
            res.status(200).send({value:true})
            }

         else {
            console.log(`ID '${idToSearchFor}' does not exist in the collection`);
            console.log("id not found false");
            res.status(401).send({value:false})
        }
    } catch (err) {
        res.send({value:false})
        console.error(err);
        return false;
    }
}

const getYearSuffix = year => {
    if (year === 1) return 'st_year';
    if (year === 2) return 'nd_year';
    return 'rd_year';
  };

module.exports=signup;









// let checkvalue = signupidcheck(sid);
// let promiseresolvedvalue = await checkvalue.then();
// let obj = { value: promiseresolvedvalue }
// if (promiseresolvedvalue) {
//     await signup_details(a, "login", "students_login");
//     res.send(obj)
//     console.log("singup accepted")
// }
// else {
//     console.log("singup rejected")
//     res.send(obj)
// }
// }

module.exports = signup;