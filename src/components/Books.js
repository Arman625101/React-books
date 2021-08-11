import { useContext } from "react";
import { DataContext } from "../contexts/Data";

const Books = ({ handleDelete }) => {
  const data = useContext(DataContext);
  const books = data.books;
  return (
    <ul>
      {books &&
        books.map((book) => (
          <li key={book.id}>
            <p>{book.name}</p>
            <div>
              <button className="edit" onClick={() => data.editModal(book)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => data.deleteModal(book.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Books;
