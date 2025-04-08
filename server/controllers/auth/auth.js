const bcrypt = require('bcrypt');
const Joi = require('joi');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken
const { pool } = require('../../config/db');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET || "random";
// Joi Validation Schemas
const registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Register User API (unchanged)
const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate the request body using Joi
        const { error } = registerSchema.validate({ name, email, password });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        // Check if user already exists
        const checkUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (checkUser.rows.length > 0) {
            return res.status(400).json('User already exists');
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user to database
        const newUser = await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, hashedPassword]
        );

        const newErp = await pool.query(
            'INSERT INTO erp (user_uuid, personal_info, enrollment_info, financial_info) VALUES ($1, $2, $3, $4) RETURNING *',
            [newUser.rows[0].user_uuid, {}, {}, {}]
        );

        res.status(201).json(newUser.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error');
    }
};

// Login User API (updated to send token)
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate the request body using Joi
        const { error } = loginSchema.validate({ email, password });
        if (error) {
            return res.status(400).json(error.details[0].message);
        }

        // Check if user exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(400).json('Invalid email or password');
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
            return res.status(400).json('Invalid email or password');
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.rows[0].id, email: user.rows[0].email }, // Payload (avoid sensitive data like password)
            JWT_SECRET,
            { expiresIn: '7d' } // Token expires in 7 days
        );

        // Send token and user data in response
        res.status(200).json({
            user: {
                id: user.rows[0].user_uuid,
                name: user.rows[0].name,
                email: user.rows[0].email
            },
            token
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error');
    }
};

module.exports = {
    Register,
    Login
};