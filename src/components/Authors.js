import { useContext } from "react";
import { DataContext } from "../contexts/Data";

const Authors = ({ handleDelete }) => {
  const authors = useContext(DataContext).authors;
  return (
    <ul>
      {authors &&
        authors.map((author) => (
          <li key={author.id}>
            {author.name}
            <button>Edit</button>
            <button onClick={() => handleDelete(author.id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Authors;
