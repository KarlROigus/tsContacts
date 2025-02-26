import pool from '../connection/connection';
import {RequestHandler} from 'express';
import { ContactType } from '../models/contacttype';


export const getContactTypes: RequestHandler = async (req, res, next) => {

    const contactTypes = await pool.query("SELECT * FROM contacttypes");

    const contactTypesAsObjects = contactTypes.rows;

    res.status(200).json({ contactTypes: contactTypesAsObjects });
};

export const createContactType: RequestHandler =async (req, res, next) => {
    
    const type = (req.body as { type: string }).type;
    const newContactType = new ContactType(type);

    try {
      
        const result = await pool.query(
          'INSERT INTO contacttypes (type) VALUES ($1) RETURNING id, type',
          [newContactType.type]
        );
        
        const createdContactType = new ContactType(result.rows[0].type, result.rows[0].id);
  
        res.status(201).json(createdContactType);
      } catch (error) {
        console.error('Error creating contact type:', error);
        res.status(500).json({ error: 'Failed to create contact type' }); 
      }

}