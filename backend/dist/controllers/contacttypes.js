"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContactType = exports.getContactTypes = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const contacttype_1 = require("../models/contacttype");
const getContactTypes = async (req, res, next) => {
    const contactTypes = await connection_1.default.query("SELECT * FROM contacttypes");
    const contactTypesAsObjects = contactTypes.rows;
    res.status(200).json({ contactTypes: contactTypesAsObjects });
};
exports.getContactTypes = getContactTypes;
const createContactType = async (req, res, next) => {
    const type = req.body.type;
    const newContactType = new contacttype_1.ContactType(type);
    try {
        const result = await connection_1.default.query('INSERT INTO contacttypes (type) VALUES ($1) RETURNING id, type', [newContactType.type]);
        const createdContactType = new contacttype_1.ContactType(result.rows[0].type, result.rows[0].id);
        res.status(201).json(createdContactType);
    }
    catch (error) {
        console.error('Error creating contact type:', error);
        res.status(500).json({ error: 'Failed to create contact type' });
    }
};
exports.createContactType = createContactType;
