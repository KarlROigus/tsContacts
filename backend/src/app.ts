import express from 'express';
import {json} from 'body-parser'
import personsRoutes from './routes/persons'
import contactTypeRoutes from './routes/contacttypes'
import pool from './connection/connection';
import cors from "cors";



const app = express();

app.use(json());
app.use(cors());

app.get("/", async (req, res) => {
    const result = await pool.query("SELECT current_database()");
    res.send(`The database name is: ${result.rows[0].current_database}`)
})


app.use('/persons', personsRoutes);
app.use('/contacttypes', contactTypeRoutes);


app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction): void => {
    console.error(err.message);

    res.status(500).json({
        message: 'Something went wrong!',
    });
} )
app.listen(3000, () => {
    console.log("Server started");
});