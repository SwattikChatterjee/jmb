const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create a transporter using your email service's SMTP credentials
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this to your email service (e.g., Gmail, Outlook)
    auth: {
        user: 'your_email@gmail.com', // Your email address
        pass: 'your_email_password' // Your email password or app-specific password
    }
});

// API Endpoint to Handle Form Submission
app.post('/send-email', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
        return res.status(400).send('All fields are required.');
    }

    // Prepare email options
    const mailOptions = {
        from: 'your_email@gmail.com', // Sender's email address
        to: 'YOUR_CLIENT_EMAIL', // Client's email address where data should be sent
        subject: `New Message: ${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Subject: ${subject}
            Message: ${message}
        `
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Form submitted and email sent successfully!' });
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
