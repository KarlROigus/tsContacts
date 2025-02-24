import pool from '../connection/connection';
import {RequestHandler} from 'express';


export const getContactTypes: RequestHandler = async (req, res, next) => {

    const contactTypes = await pool.query("SELECT * FROM contacttypes");

    const contactTypesAsObjects = contactTypes.rows;

    res.status(200).json({ contactTypes: contactTypesAsObjects });
};