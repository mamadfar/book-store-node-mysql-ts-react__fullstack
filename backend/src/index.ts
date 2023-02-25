import express, {Request, Response} from "express";
import mysql, {MysqlError} from "mysql";
import morgan from 'morgan';
import { IBook } from "./vendor/book.vendor";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "SAbah@x11",
  database: "test",
});

app.get("/", (req: Request, res: Response) => {
  res.json("Hello Mohammad");
});

app.get("/books", (req: Request, res: Response<{}, ReadonlyArray<IBook>>) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req: Request<{}, {}, Omit<IBook, "id">>, res: Response) => {
  const query = "INSERT INTO books(`title`, `desc`, `cover`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected!");
});