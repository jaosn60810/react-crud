import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import * as dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

app.get('/', (req, res) => {
  res.json('hello');
});

app.get('/books', (req, res) => {
  const q = 'SELECT * FROM books';
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = 'SELECT * FROM books WHERE id = ?';
  const params = [bookId];
  db.query(q, params, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post('/books', (req, res) => {
  const q = 'INSERT INTO books(`title`, `desc`, `price`, `cover`) VALUES (?)';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q = ' DELETE FROM books WHERE id = ? ';

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const q =
    'UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server running at port http://localhost:${port}!`);
});
