import { useContext } from "react";
import { DataContext } from "../contexts/Data";

const Genres = ({ handleDelete }) => {
  const genres = useContext(DataContext).genres;
  return (
    <ul>
      {genres &&
        genres.map((genre) => (
          <li key={genre.id}>
            {genre.name}
            <button>Edit</button>
            <button onClick={() => handleDelete(genre.id)}>Delete</button>
          </li>
        ))}
    </ul>
  );
};

export default Genres;
