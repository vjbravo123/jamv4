const client = require("../database/client_connector");

// Function to delete a student query from the database
const deleteStudentQuery = async (req, res) => {
  try {
    // Get the database reference and collection
    const collection = client.db(req.params.db).collection("students_query");

    // Extract the roll_no from the request body
    const { roll_no } = req.body;


    // Create the filter to find the document to delete
    const filter = { roll_no: roll_no };

    // Perform the delete operation
    await collection.deleteOne(filter);

    // Respond with success message
    const response = { message: "Student query deleted successfully" };
    res.json(response);
  } catch (error) {
    // Handle any errors that occurred during the operation
    console.error("Error deleting student query:", error.message);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
};

module.exports = deleteStudentQuery;
