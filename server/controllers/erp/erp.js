const bcrypt = require('bcrypt');
const Joi = require('joi');  // Import Joi for validation
const { pool } = require('../../config/db');


// Post data to erp table

const postErp = async (req, res) => {
    try{
        const {user_uuid,academics,others} = req.body;
        const {error} = erpSchema.validate({user_uuid,academics,others});
        if(error) return res.status(400).json(error.details[0].message);
        const newErp = await pool.query(
            'INSERT INTO erp (user_uuid,academics,others) VALUES ($1,$2,$3) RETURNING *',
            [user_uuid,academics,others]
        );

        return res.status(201).json(newErp.rows[0]);
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json('Server error');
    }
}

// Get data from erp table for a particular user

const getErp = async (req, res) => {
    try{
        const {user_uuid} = req.params;
        const erp = await pool.query('SELECT * FROM erp WHERE user_uuid = $1',[user_uuid]);
        return res.json(erp.rows);
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json('Server error');
    }
}


// Update data in erp table

const updateErp = async (req, res) => {
    try{
        const {user_uuid} = req.params;
        const {academics,others} = req.body;
        const {error} = erpSchema.validate({academics,others});
        if(error) return res.status(400).json(error.details[0].message);
        const updatedErp = await pool.query(
            'UPDATE erp SET academics = $1, others = $2 WHERE user_uuid = $3 RETURNING *',
            [academics,others,user_uuid]
        );

        return res.json(updatedErp.rows[0]);
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json('Server error');
    }
}

// Delete data from erp table

const deleteErp = async (req, res) => {
    try{
        const {user_uuid} = req.params;
        const deletedErp = await pool.query('DELETE FROM erp WHERE user_uuid = $1 RETURNING *',[user_uuid]);
        return res.json(deletedErp.rows[0]);
    }
    catch(error){
        console.error(error.message);
        return res.status(500).json('Server error');
    }
}

module.exports = {postErp,getErp,updateErp,deleteErp};

