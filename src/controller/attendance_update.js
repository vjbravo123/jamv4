const client = require("../database/client_connector")
const { ObjectId } = require("mongodb");

const queried_attendance_update = async (req, res) => {
  const collection = client.db(req.params.db).collection(req.params.collection)
  
  //this is the array of objects of attendance of that student
  let documents = req.body;
  for (let i = 0; i < documents.length; i++) {
    const idToSearchFor = documents[i]._id;
    let filter = { _id: new ObjectId(idToSearchFor) }
    let newValues = { $set: { attendance_status: documents[i].attendance_status } }
    let result = await collection.updateOne(filter, newValues);
    console.log(result.modifiedCount + " document(s) updated");
  }

  let response= { success:true ,message: "Attendance Updated successfully" }
  res.send(response)
}
module.exports = queried_attendance_update;