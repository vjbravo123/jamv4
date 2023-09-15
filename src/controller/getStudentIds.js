const client = require('../database/client_connector');

const GetStudentIds = async (req, res) => {
        const selectedDatabase = req.query.database; // Get the selected database from the URL query parameter
    
        try {
            const ids = await client.db(selectedDatabase).collection("students_details").find().sort({ sno: 1 }).toArray();
    
            const formattedIds = ids.map((entry) => ({
                name: entry.name,
                id: entry._id.toString(), // Convert ObjectId to string
            }));
    
            // console.log(formattedIds);
    
            res.setHeader('Content-Type', 'application/json'); // Set Content-Type header
            res.json({ studentIds: formattedIds }); // Sending the formatted IDs in the response
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" }); // Return JSON error response
        }
    }
module.exports=GetStudentIds;