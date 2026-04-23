const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Allow frontend to hit backend endpoints from different origin (e.g. port 80 vs 3000)
app.use(express.json());

// Database connection config
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'myapp'
};

let pool;

async function setupDatabaseConnection() {
    console.log(`Attempting to connect to db at ${dbConfig.host}...`);
    pool = mysql.createPool(dbConfig);
    
    // Test the connection
    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database!');
        connection.release();
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        // Sometimes docker-compose depends_on health isn't enough, can add retry logic here if needed
    }
}

setupDatabaseConnection();

// Simple healthcheck route
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Main POST API
app.post('/api/message', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).send('Name is required');
    }

    try {
        // Save to DB
        if (pool) {
            await pool.query('INSERT INTO users (name) VALUES (?)', [name.trim()]);
        } else {
            console.warn('DB not connected. Processing without saving.');
        }

        // Return expected string
        res.send(`Hello ${name.trim()} from backend`);
    } catch (error) {
        console.error('Error inserting into DB:', error);
        res.status(500).send('Server error. Could not save to database.');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening on port ${port}...`);
});
