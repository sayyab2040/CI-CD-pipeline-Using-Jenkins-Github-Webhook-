const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

    try {
        const connection = await pool.getConnection();
        console.log('Successfully connected to MySQL database!');
        connection.release();
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    }
}

setupDatabaseConnection();

app.get('/', (req, res) => {
    res.send('Backend Running');
});

app.post('/api/message', async (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        return res.status(400).send('Name is required');
    }

    try {
        if (pool) {
            await pool.query('INSERT INTO users (name) VALUES (?)', [name.trim()]);
        } else {
            console.warn('DB not connected. Processing without saving.');
        }

        res.send(`Hello ${name.trim()} from backend`);
    } catch (error) {
        console.error('Error inserting into DB:', error);
        res.status(500).send('Server error. Could not save to database.');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Backend server listening on port ${port}...`);
});