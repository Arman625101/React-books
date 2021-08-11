import { useContext } from "react";
import { DataContext } from "../contexts/Data";

const Authors = ({ handleDelete }) => {
  const data = useContext(DataContext);
  const authors = data.authors;
  return (
    <ul>
      {authors &&
        authors.map((author) => (
          <li key={author.id}>
            <p>{author.name}</p>
            <div>
              <button className="edit" onClick={() => data.editModal(author)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => data.deleteModal(author.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Authors;
