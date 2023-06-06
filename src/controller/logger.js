const client = require("../database/client_connector");
const nodemailer = require("nodemailer");

const logger = async (req, res, next) => {
  res.send({message:"yes this is the server"})
};

module.exports = logger;
