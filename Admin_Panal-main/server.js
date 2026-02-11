require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const morgan = require('morgan');
const connectDB = require('./config/db');
const Admin = require('./models/Admin');

const app = express();

// --- DATABASE CONNECTION ---
connectDB().then(() => {
    seedAdmin();
});

// --- MIDDLEWARE ---
app.use(morgan('dev'));
const allowedOrigins = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174'
];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log("CORS Blocked for origin:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/dashboardRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// --- SEED FUNCTION ---
async function seedAdmin() {
    try {
        const adminExist = await Admin.findOne({ email: 'admin@example.com' });
        if (!adminExist) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            await Admin.create({
                email: 'admin@example.com',
                password: hashedPassword
            });
            console.log('--- ADMIN SEEDED: admin@example.com / password123 ---');
        } else {
            console.log('Admin already exists in DB');
        }
    } catch (err) {
        console.error('Seed Error:', err);
    }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
