import { useContext } from "react";
import { DataContext } from "../contexts/Data";

const Books = ({ handleDelete }) => {
  const books = useContext(DataContext).books;
  return (
    <ul>
      {books &&
        books.map((book) => (
          <li key={book.id}>
            {book.name}
            <button>Edit</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Books;
