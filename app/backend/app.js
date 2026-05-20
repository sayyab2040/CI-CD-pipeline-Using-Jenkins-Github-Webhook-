const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'login_app',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;
let dbStatus = 'disconnected';

// Initialize database connection
async function initDB() {
    try {
        pool = mysql.createPool(dbConfig);

        await pool.query('SELECT 1');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        dbStatus = 'connected';
        console.log('Database connected successfully');
    } catch (error) {
        dbStatus = 'error';
        console.error('Database connection failed:', error.message);

        setTimeout(initDB, 5000);
    }
}

initDB();

// Helper function to check database availability
function isDatabaseReady() {
    return pool && dbStatus === 'connected';
}

// Root route
app.get('/', (req, res) => {
    res.send('Backend Running');
});

// Health check route
app.get('/health', async (req, res) => {
    let databaseCheck = dbStatus;

    try {
        if (pool) {
            await pool.query('SELECT 1');
            databaseCheck = 'connected';
            dbStatus = 'connected';
        }
    } catch (error) {
        databaseCheck = 'error';
        dbStatus = 'error';
    }

    res.status(200).json({
        status: 'running',
        service: 'login-backend',
        database: databaseCheck,
        timestamp: new Date().toISOString()
    });
});

// Register API
app.post('/api/register', async (req, res) => {
    if (!isDatabaseReady()) {
        return res.status(503).json({
            message: 'Database is not ready yet. Please try again shortly.'
        });
    }

    const name = req.body.name ? req.body.name.trim() : '';
    const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
    const password = req.body.password || '';

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'Please provide name, email, and password'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long'
        });
    }

    try {
        const [existingUsers] = await pool.query(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: 'User with this email already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({
            message: 'Internal server error during registration'
        });
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    if (!isDatabaseReady()) {
        return res.status(503).json({
            message: 'Database is not ready yet. Please try again shortly.'
        });
    }

    const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
    const password = req.body.password || '';

    if (!email || !password) {
        return res.status(400).json({
            message: 'Please provide email and password'
        });
    }

    try {
        const [users] = await pool.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        const user = users[0];

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({
            message: 'Internal server error during login'
        });
    }
});

// Get users API for testing
app.get('/api/users', async (req, res) => {
    if (!isDatabaseReady()) {
        return res.status(503).json({
            message: 'Database is not ready yet. Please try again shortly.'
        });
    }

    try {
        const [users] = await pool.query(
            'SELECT id, name, email, created_at FROM users ORDER BY id DESC'
        );

        res.status(200).json(users);
    } catch (error) {
        console.error('Fetch users error:', error.message);
        res.status(500).json({
            message: 'Internal server error while fetching users'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server running on port ${PORT}`);
});