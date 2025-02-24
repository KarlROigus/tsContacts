"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersons = exports.createPerson = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const person_1 = require("../models/person");
const createPerson = async (req, res, next) => {
    const name = req.body.name;
    const newPerson = new person_1.Person(name);
    try {
        const result = await connection_1.default.query('INSERT INTO persons (name) VALUES ($1) RETURNING id, name', [newPerson.name]);
        const createdPerson = new person_1.Person(result.rows[0].name, result.rows[0].id);
        console.log(createdPerson);
        res.status(201).json(createdPerson);
    }
    catch (error) {
        console.error('Error creating person:', error);
        res.status(500).json({ error: 'Failed to create person' });
    }
};
exports.createPerson = createPerson;
const getPersons = async (req, res, next) => {
    const persons = await connection_1.default.query("SELECT * FROM persons");
    const personsAsObjects = persons.rows;
    res.status(200).json({ persons: personsAsObjects });
};
exports.getPersons = getPersons;
