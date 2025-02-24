"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContactTypes = void 0;
const connection_1 = __importDefault(require("../connection/connection"));
const getContactTypes = async (req, res, next) => {
    const contactTypes = await connection_1.default.query("SELECT * FROM contacttypes");
    const contactTypesAsObjects = contactTypes.rows;
    res.status(200).json({ contactTypes: contactTypesAsObjects });
};
exports.getContactTypes = getContactTypes;
