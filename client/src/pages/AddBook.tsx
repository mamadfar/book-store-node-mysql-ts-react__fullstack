import { ChangeEvent, FormEvent, useState } from 'react';
import "./AddBookEditBook.scss";
import { IBook } from '../model/book.model';
import { useNavigate } from 'react-router';
import { createBookService } from '../services/book.service';

const AddBook = () => {
  const [book, setBook] = useState<Omit<IBook, "id">>({
    title: "",
    desc: "",
    price: 0,
    cover: ""
  });
  const navigate = useNavigate();

  const handleChangeInputs = (e: ChangeEvent<HTMLInputElement>) => {
    setBook(prevState => ({...prevState, [e.target.name]: (e.target.name === "price") ? Number(e.target.value) : e.target.value}))
  }

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const {status} = await createBookService(book);
    if(status === 201) {
      alert("New book has been created.")
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
}

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h1>Add New Book</h1>
      <input type="text" onChange={handleChangeInputs} placeholder='Title' name='title'/>
      <input type="text" onChange={handleChangeInputs} placeholder='Description' name='desc'/>
      <input min={0} type="number" onChange={handleChangeInputs} placeholder='Price' name='price'/>
      <input type="text" onChange={handleChangeInputs} placeholder='Cover' name='cover'/>
      <button>Add</button>
    </form>
  )
}

export default AddBook;