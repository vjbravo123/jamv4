const client = require("../database/client_connector");

const db_data_inserter = async (obj,db,collection) =>{
    const collection_reference = client.db(db).collection(collection);
    await collection_reference.insertOne(obj);
    console.log(`${obj} is inserted in the ${db} database in ${collection} collection `);
}

module.exports = db_data_inserter;