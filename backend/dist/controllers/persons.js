"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPersons = exports.createPerson = void 0;
const person_1 = require("../models/person");
const connection_1 = __importDefault(require("../connection/connection"));
const PERSONS = [];
const createPerson = (req, res, next) => {
    const name = req.body.name;
    const newPerson = new person_1.Person(Math.random(), name);
    PERSONS.push(newPerson);
    console.log(PERSONS);
    res.status(201).json({
        "message": 'Created the person.',
        createdPerson: newPerson
    });
};
exports.createPerson = createPerson;
const getPersons = async (req, res, next) => {
    const persons = await connection_1.default.query("SELECT * FROM persons");
    const personsAsObjects = persons.rows;
    res.status(200).json({ persons: personsAsObjects });
};
exports.getPersons = getPersons;
