import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import books from "./src/routes/books"
import genres from "./src/routes/genres"
import authors from "./src/routes/authors"


dotenv.config();

const app = express();
app.use(express.json());

const port = parseInt(process.env.PORT || "3000");

// Routes
app.use('/books', books)
app.use('/genres', genres)
app.use('/authors', authors)

app.get("/", (req: Request, res: Response) => {
    res.send("Whoop WHoop! I'm alive!");
})

app.listen(port, '0.0.0.0', () => {
    console.log('[server]: Server is running at http://localhost:' + port);
})
