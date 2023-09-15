const client = require('../database/client_connector')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
    service: "Gmail", // E.g., "Gmail", "Yahoo", etc.
    auth: {
        user: "vjbravojoshi@gmail.com",
        pass: "qdib afwa flkl ztyl ",
    },
});

const Sendmail =  async (req, res) => {
    try {
        const selectedDatabase = req.body.database;
        const email = req.body.email;
        const studentIds = req.body.studentIds; // Access the student IDs from the request body

        // Create an email body using the student IDs or data
        const emailBody = `
            <h1>Student IDs from ${selectedDatabase}</h1>
            <ul>
                ${studentIds.map((studentString) => {
                    const [name, id] = studentString.split(" - "); // Split the string into name and ID
                    return `<li>${name} - ${id}</li>`;
                }).join("")}
            </ul>
        `;

        // Define the email options
        const mailOptions = {
            from: "vjbravojoshi@gmail.com",
            to: email,
            subject: `Student IDs from ${selectedDatabase}`,
            html: emailBody,
        };

        // Send the email using Nodemailer
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).json({ success: false, error: "Failed to send email" });
            } else {
                console.log("Email sent: " + info.response);
                res.json({ success: true, message: "Email sent successfully" });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
}

module.exports=Sendmail;