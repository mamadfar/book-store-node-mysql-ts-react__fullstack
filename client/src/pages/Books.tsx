import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./Books.scss";
import { IBook } from "../model/book.model";
import { deleteBookService, getBooksService } from "../services/book.service";

const Books = () => {
  const [books, setbooks] = useState<IBook[]>([]);
  const navigate = useNavigate();

  const getBooks = async () => {
    try {
      const { data } = await getBooksService();
      setbooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id: string | number) => {
    try {
      const { status } = await deleteBookService(id);
      if (status === 204) {
        alert("Book has been deleted.");
        const filteredBooks = books.filter(book => book.id !== id);
        setbooks([...filteredBooks]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="books-wrapper">
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div key={book.id} className="book">
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book?.price}</span>
            <button className="delete" onClick={() => deleteBook(book.id)}>
              Delete
            </button>
            <button className="edit" onClick={() => navigate(`/edit/${book.id}`)}>Edit</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/add")}>Add new book</button>
    </div>
  );
};

export default Books;
