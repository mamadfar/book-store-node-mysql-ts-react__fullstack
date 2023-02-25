import express, { Request, Response } from "express";
import mysql, { MysqlError } from "mysql";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { IBook } from "./vendor/book.vendor";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:3000", // or we can use *
  })
);
const PORT = process.env.PORT || 8800;

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

app.get("/", (req: Request, res: Response) => {
  res.json("Hello Mohammad");
});

app.get("/books", (req: Request, res: Response<{}, ReadonlyArray<IBook>>) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
});

app.get("/book/:id", (req: Request, res: Response) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";
  
  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(...data);
  })
});

app.post("/books", (req: Request<{}, {}, Omit<IBook, "id">>, res: Response) => {
  const query =
    "INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.status(201).json(data);
  });
});

app.delete("/books/:id", (req: Request<{id: string}>, res: Response) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.status(204).json("Book has been deleted.");
  });
});

app.put("/books/:id", (req: Request<{id: string}, {}, Omit<IBook, "id">>, res: Response) => { //? Request<{params}, {}, reqBody>
  const bookId = req.params.id;
  const query =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const values = [
      req.body.title,
      req.body.desc,
      req.body.price,
      req.body.cover
    ];

    db.query(query, [...values, bookId], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("Book has been updated.");
    })
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
