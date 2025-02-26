"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const persons_1 = __importDefault(require("./routes/persons"));
const contacttypes_1 = __importDefault(require("./routes/contacttypes"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const connection_1 = __importDefault(require("./connection/connection"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)());
app.get("/", async (req, res) => {
    const result = await connection_1.default.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`);
});
app.use('/persons', persons_1.default);
app.use('/contacttypes', contacttypes_1.default);
app.use('/contacts', contacts_1.default);
app.use((err, req, res, next) => {
    console.error(err.message);
    res.status(500).json({
        message: 'Something went wrong!',
    });
});
app.listen(3000, () => {
    console.log("Server started");
});
