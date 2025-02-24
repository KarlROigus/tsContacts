import {RequestHandler} from 'express';
import { Person } from '../models/person';

import pool from '../connection/connection';

const PERSONS: Person[] = [];

export const createPerson: RequestHandler = (req, res, next) => {

    const name = (req.body as {name: string}).name;

    const newPerson = new Person(Math.random().toString(), name);

    PERSONS.push(newPerson);

    console.log(PERSONS);

    res.status(201).json({
        "message": 'Created the person.',
        createdPerson: newPerson
    })

}

export const getPersons: RequestHandler = async (req, res, next) => {

    const persons = await pool.query("SELECT * FROM persons");

    const personsAsObjects = persons.rows;

    res.status(200).json({ persons: personsAsObjects });
};