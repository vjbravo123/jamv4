let client = require("../database/client_connector");

const getCollections = async (dbname) => {

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

