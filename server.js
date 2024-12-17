const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Swattika1',
    database: 'contact_form_db',
    ssl: {
        rejectUnauthorized: false // Disable SSL verification
    }
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL Database:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL Database!');
});

// API Endpoint to Handle Form Submission
app.post('/submit-form', (req, res) => {
    const { name, email, mob, txt } = req.body;
    const query = 'INSERT INTO contacts (name, email, mob, txt) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, mob, txt], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error saving data.');
        } else {
            res.status(200).send('Data saved successfully!');
        }
    });
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
         