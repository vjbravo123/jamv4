const client = require("../database/client_connector");

const dbList = async (req, res, next) => {

    try {
        const dbList = await client.db().admin().listDatabases();
        const filteredDatabases = dbList.databases
            .map((db) => db.name)
            .filter((dbName) => !["test", "admin", "local", "Credentials"].includes(dbName)); // Exclude "test", "admin", and "local"

        res.json({ databases: filteredDatabases });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = dbList;