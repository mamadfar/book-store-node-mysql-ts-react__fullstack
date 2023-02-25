import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import "./AddBookEditBook.scss";
import { IBook } from "../model/book.model";
import { useNavigate, useParams } from "react-router";
import { getSingleBookService, updateBookService } from "../services/book.service";

const EditBook = () => {
  const [book, setBook] = useState<Omit<IBook, "id">>({
    title: "",
    desc: "",
    price: 0,
    cover: "",
  });
  const [bookTitle, setBookTitle] = useState<string>("");
  const navigate = useNavigate();
  const params = useParams();

const getBook = async () => {
  try {
    const {data, status} = await getSingleBookService(params.id);
    console.log(data)
    if(status === 200) {
      setBook(prevState => ({...prevState, ...data}));
      setBookTitle(data.title);
    }
  } catch (error) {
    console.log(error)
  }
}

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setBook((prevState) => ({
      ...prevState,
      [e.target.name]:
        e.target.name === "price" ? Number(e.target.value) : e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status } = await updateBookService(params.id, book);
      if (status === 200) {
        alert("book has been updated.");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBook();
  }, [])

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>Update Book <u>{bookTitle}</u></h1>
      <input
        type="text"
        onChange={handleChangeInputs}
        placeholder="Title"
        name="title"
        value={book.title}
      />
      <input
        type="text"
        onChange={handleChangeInputs}
        placeholder="Description"
        name="desc"
        value={book.desc}
      />
      <input
        min={0}
        type="number"
        onChange={handleChangeInputs}
        placeholder="Price"
        name="price"
        value={book.price}
      />
      <input
        type="text"
        onChange={handleChangeInputs}
        placeholder="Cover"
        name="cover"
        value={book.cover}
      />
      <button>Update</button>
    </form>
  );
};

export default EditBook;
