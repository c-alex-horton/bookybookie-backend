import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || "3000");

app.get("/", (req: Request, res: Response) => {
    res.send("Whoop WHoop! I'm alive!");
})

app.listen(port, '0.0.0.0', () => {
    console.log('[server]: Server is running at http://localhost:' + port);
})
