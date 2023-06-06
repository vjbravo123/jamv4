let client = require("../database/client_connector");
// const attendance_finder = require('./attendance_finder')
const getCollections = require('../function/db_subjects.js')

const cred_check = async (req, res) => {

    const name = req.body.Username;
    const password = req.body.Password;

    const filter = { "Username": name, "Password": password }
    console.log(filter , req.params.collection);

    let collection_reference = client.db('Credentials').collection(req.params.collection);

    const result = await collection_reference.find(filter).toArray().then();
    const docCount = result.length;


    console.log(`found ${docCount} Documents :`);
    try {
        // console.log(req.params.arg1);
       if(req.params.collection==='users') //this if block is for checking teachers credentials
       { 

           if (docCount > 0) {
               res.status(200).json({ value: true , data:result})
           }
           else {
               res.status(401).json({ value: false })
           }
       }
     else if(req.params.collection==='datalogger') //this if block is for checking teachers credentials
       { 

           if (docCount > 0) {
               res.status(200).json({ value: true })
           }
           else {
               res.status(401).json({ value: false })
           }
       }

      else{  //for students cred

        if(docCount>0){
            // let result = await collection_reference.find(filter).toArray();
            console.log(result);

            const result2 =await getCollections(result[0].Subcourse);
            console.log(result2);
       
            
            let obj ={ value:true ,Subcourse:result[0].Subcourse , subarr:result2 ,roll_no:result[0].roll_no}
            res.json(obj);
        }
        else{
            res.json({value:false})
        }
      }
    }
    catch (err) {
        console.log("404 error:" + err)
    }
}
module.exports = cred_check;