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

// Initialize Database connection
async function initDB() {
    try {
        pool = mysql.createPool(dbConfig);
        await pool.query('SELECT 1');
        dbStatus = 'connected';
        console.log('Database connected successfully');
    } catch (error) {
        dbStatus = 'error';
        console.error('Database connection failed:', error);
        // Retry logic for docker-compose initialization
        setTimeout(initDB, 5000);
    }
}
initDB();

// Routes
app.get('/', (req, res) => {
    res.send('Backend Running');
});

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'running', 
        database: dbStatus,
        timestamp: new Date() 
    });
});

// Register API
app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide name, email, and password' });
    }

    try {
        // Check if user exists
        const [existingUsers] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user
        await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashedPassword]);
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login API
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    try {
        // Find user
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Success (In a real app, you would return a JWT here)
        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get users API (For testing purposes)
app.get('/api/users', async (req, res) => {
    try {
        const [users] = await pool.query('SELECT id, name, email, created_at FROM users');
        res.status(200).json(users);
    } catch (error) {
        console.error('Fetch users error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
