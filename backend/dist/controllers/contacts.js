"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContact = exports.getContacts = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const getContacts = async (req, res, next) => {
    const contacts = await connection_1.default.query("SELECT contacts.id, contacts.value, persons.name as personname, contacttypes.type as contacttypevalue FROM contacts JOIN persons ON contacts.person_id = persons.id JOIN contacttypes on contacts.contacttype_id = contacttypes.id");
    const contactsAsObject = contacts.rows;
    res.status(200).json({ contacts: contactsAsObject });
};
exports.getContacts = getContacts;
const createContact = async (req, res, next) => {
    const { value, chosenPersonId: personid, chosenTypeId: typeId } = req.body;
    try {
        const result = await connection_1.default.query('INSERT INTO contacts (value, person_id, contacttype_id) VALUES ($1, $2, $3) RETURNING id, value', [
            value, personid, typeId
        ]);
        res.status(201).json({ id: result.rows[0].id, value: result.rows[0].value });
    }
    catch (e) {
        console.error('Error creating contact type:', e);
        res.status(500).json({ error: 'Failed to create contact type' });
    }
};
exports.createContact = createContact;
