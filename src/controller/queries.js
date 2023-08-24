const client = require('../database/client_connector');

const queries = async (req, res) => {
  try {
    const db = client.db(req.params.db);
    const collection = db.collection('students_query');
    const result = await collection.find().toArray();

    if (result.length === 0) {
      console.log(result);
      // If no documents found, return a 404 Not Found status
      return res.status(404).json({ success: false, message: 'No data found' });
    }

    // If documents are found, return a 200 OK status with the data
    res.status(200).json({ success: true , data: result, });
    
} catch (error) {
    console.error('Error during database operation:', error);
    // Handle other potential errors with a 500 Internal Server Error status
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: error.message,
    });
  }
};

module.exports = queries;
