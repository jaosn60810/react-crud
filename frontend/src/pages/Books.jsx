import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/books');
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main style={{ textAlign: 'center' }}>
      <h1>Book Shop</h1>

      <div className="grid">
        {books.map((book) => (
          <article
            key={book.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <header>
              <h2>{book.title}</h2>
              <p>{book.desc}</p>
              <span>${book.price}</span>
            </header>

            <img src={book.cover} alt="" />

            <footer>
              <button type="button" onClick={() => handleDelete(book.id)}>
                Delete
              </button>
              <button
                type="button"
                onClick={() => navigate(`/update/${book.id}`)}
              >
                Update
              </button>
            </footer>
          </article>
        ))}
      </div>

      <button type="button" onClick={() => navigate(`/add`)}>
        Add new book
      </button>
    </main>
  );
};

export default Books;
