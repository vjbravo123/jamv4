let client = require("../database/client_connector");

const getCollections = async (dbname) => {
  // MONGODB_URI = "mongodb+srv://escanor:vj1212@cluster0.9mok6ao.mongodb.net/?retryWrites=true";
  // const { MongoClient } = require('mongodb');


  // // const client = new MongoClient(MONGODB_URI);

  // client.connect((err) => {
  //   if (err) throw err;
  //   console.log('MongoDB Connected!');
  // });
  const subarr = [];
  try {
    console.log('Connected to MongoDB');

    const database = client.db(dbname);
    const collections = await database.listCollections().toArray();

    console.log('Collections:');
    collections.forEach((collection) => {
      // Exclude specific collections
      if (collection.name !== 'students_details' && collection.name !== 'users_credentials' && collection.name !== 'students_query') {
        console.log(collection.name);
        subarr.push(collection.name)
      }
    });
    return subarr;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    console.log('Disconnected from MongoDB');
  }

}

module.exports = getCollections;

