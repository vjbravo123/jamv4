let client = require("../database/client_connector");
const bcrypt = require('bcryptjs')
// const attendance_finder = require('./attendance_finder')
const getCollections = require('../function/db_subjects.js')

const cred_check = async (req, res) => {

    //taking out name and password from the req body
    const name = req.body.Username;
    const password = req.body.Password;

   const collection_reference=client.db("Credentials").collection(req.params.collection)
    
    const filter = { "Username": name };

    console.log(filter, req.params.collection);

    const documentsWithUsername = await collection_reference.find(filter).toArray();
    let result = null;
    let passwordCompare = null;
    if (documentsWithUsername.length === 0) {
        // No documents with the given username found
        console.log("Username not found");
    } else {

        for (const doc of documentsWithUsername) {
            passwordCompare = await bcrypt.compare(password, doc.Password);
            if (passwordCompare) {
                result = doc; // Save the matched document in the result variable
                console.log("Password matches for at least one document");
                break; // No need to check further once a match is found
            }
        }
    
        if (result) {
            console.log("Document with matching password:", result);
        } else {
            console.log("Password does not match for any document");
        }
    }
    



    console.log(`found ${documentsWithUsername.length} Documents with username ${filter.Username} :`);

    try {
       
       if(req.params.collection==='users') //this if block is for checking teachers credentials
       { 

           if (passwordCompare=== true) {
               res.status(200).json({ value: true , data:result})
           }
           else {
               res.status(401).json({ value: false })
           }
       }
     else if(req.params.collection==='datalogger') //this if block is for checking teachers credentials
       { 

           if (passwordCompare=== true) {
               res.status(200).json({ value: true })
           }
           else {
               res.status(401).json({ value: false })
           }
       }

      else{  //for students cred

        if(passwordCompare=== true){
            const result2 =await getCollections(result.Subcourse);
            result2.push(result .Username)
            console.log(result2);


            let obj ={ value:true ,Subcourse:result.Subcourse , subarr:result2 ,roll_no:result.roll_no}
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