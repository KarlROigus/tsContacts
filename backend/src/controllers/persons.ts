import {RequestHandler} from 'express';
import pool from '../connection/connection';
import { Person } from '../models/person';

export const createPerson: RequestHandler = async (req, res, next) => {
    const name = (req.body as { name: string }).name;
    const newPerson = new Person(name);
  
    try {
      
      const result = await pool.query(
        'INSERT INTO persons (name) VALUES ($1) RETURNING id, name',
        [newPerson.name]
      );
      
      const createdPerson = new Person(result.rows[0].name, result.rows[0].id);

      res.status(201).json(createdPerson);
    } catch (error) {
      console.error('Error creating person:', error);
      res.status(500).json({ error: 'Failed to create person' }); 
    }
  };

export const getPersons: RequestHandler = async (req, res, next) => {

    const persons = await pool.query("SELECT * FROM persons");

    const personsAsObjects = persons.rows;

    res.status(200).json({ persons: personsAsObjects });
};