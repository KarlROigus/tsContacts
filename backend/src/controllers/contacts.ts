import {RequestHandler} from 'express';
import pool from '../connection/connection';
import { Contact } from '../models/contact';

export const getContacts: RequestHandler = async (req, res, next) => {

    const contacts = await pool.query(
        "SELECT contacts.id, contacts.value, persons.name as personname, contacttypes.type as contacttypevalue FROM contacts JOIN persons ON contacts.person_id = persons.id JOIN contacttypes on contacts.contacttype_id = contacttypes.id"
    );

    const contactsAsObject = contacts.rows;


    res.status(200).json({ contacts: contactsAsObject });
};

export const createContact: RequestHandler = async (req, res, next) => {

    const { value, chosenPersonId: personid, chosenTypeId: typeId } = req.body as { 
    value: string; 
    chosenPersonId: number; 
    chosenTypeId: number;   
    };

    try {
        const result = await pool.query('INSERT INTO contacts (value, person_id, contacttype_id) VALUES ($1, $2, $3) RETURNING id, value', [
            value, personid, typeId
        ])

        res.status(201).json({ id: result.rows[0].id, value: result.rows[0].value});

    } catch (e) {
        console.error('Error creating contact type:', e);
        res.status(500).json({ error: 'Failed to create contact type' }); 
    }

}