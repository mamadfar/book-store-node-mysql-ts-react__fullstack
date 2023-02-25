import axios from 'axios';
import { IBook } from '../model/book.model';

export const getBooksService = () => {
    return axios.get<IBook[]>("http://localhost:8800/books");
}

export const getSingleBookService = (id: string | number | undefined) => {
    return axios.get<IBook>(`http://localhost:8800/book/${id}`);
}

export const createBookService = (book: Omit<IBook, "id">) => {
    return axios.post<IBook>("http://localhost:8800/books", book);
}

export const deleteBookService = (id: string | number) => {
    return axios.delete(`http://localhost:8800/books/${id}`);
}

export const updateBookService = (id: (string | number | undefined), updatedBook: Omit<IBook, "id">) => {
    return axios.put(`http://localhost:8800/books/${id}`, updatedBook);
}