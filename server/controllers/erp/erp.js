const bcrypt = require('bcrypt');
const Joi = require('joi');
const { pool } = require('../../config/db');

// Validation schema
const erpSchema = Joi.object({
    user_uuid: Joi.string().required(),
    personal_info: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        gender: Joi.string().required(),
        nationality: Joi.string().required(),
        contact_info: Joi.object({
            email: Joi.string().email().required(),
            phone: Joi.string().required()
        }).required(),
        profile_picture: Joi.string().uri().allow('')
    }).required(),
    enrollment_info: Joi.object({
        program: Joi.string().required(),
        major: Joi.string().required(),
        minor: Joi.string().allow(''),
        current_year: Joi.number().integer().min(1).max(6).required(),
        status: Joi.string().required()
    }).required(),
    financial_info: Joi.object({
        tuition_fee: Joi.number().required(),
        outstanding_balance: Joi.number().required()
    }).required()
});

// Post data
const postErp = async (req, res) => {
    try {
        const { user_uuid, personal_info, enrollment_info, financial_info } = req.body;
        const { error } = erpSchema.validate({ user_uuid, personal_info, enrollment_info, financial_info });
        if (error) return res.status(400).json(error.details[0].message);

        const newErp = await pool.query(
            'INSERT INTO erp (user_uuid, personal_info, enrollment_info, financial_info) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_uuid, personal_info, enrollment_info, financial_info]
        );

        return res.status(201).json(newErp.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server error');
    }
};

// Get data
const getErp = async (req, res) => {
    try {
        const { user_uuid } = req.params;
        const erp = await pool.query('SELECT * FROM erp WHERE user_uuid = $1', [user_uuid]);
        if (erp.rows.length === 0) return res.status(404).json('Student not found');
        return res.json(erp.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server error');
    }
};

// Update data
const updateErp = async (req, res) => {
    try {
        const { user_uuid } = req.params;
        const { personal_info, enrollment_info, financial_info } = req.body;
        // const { error } = erpSchema.validate({ user_uuid, personal_info, enrollment_info, financial_info });
        // if (error) return res.status(400).json(error.details[0].message);

        const updatedErp = await pool.query(
            'UPDATE erp SET personal_info = $1, enrollment_info = $2, financial_info = $3 WHERE user_uuid = $4 RETURNING *',
            [personal_info, enrollment_info, financial_info, user_uuid]
        );

        if (updatedErp.rows.length === 0) return res.status(404).json('Student not found');
        return res.json(updatedErp.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server error');
    }
};

// Delete data
const deleteErp = async (req, res) => {
    try {
        const { user_uuid } = req.params;
        const deletedErp = await pool.query('DELETE FROM erp WHERE user_uuid = $1 RETURNING *', [user_uuid]);
        if (deletedErp.rows.length === 0) return res.status(404).json('Student not found');
        return res.json(deletedErp.rows[0]);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json('Server error');
    }
};

module.exports = { postErp, getErp, updateErp, deleteErp };