import { useContext } from "react";
import { DataContext } from "../contexts/Data";

const Genres = () => {
  const data = useContext(DataContext);
  const genres = data.genres;
  return (
    <ul>
      {genres &&
        genres.map((genre) => (
          <li key={genre.id}>
            <p>{genre.name}</p>
            <div>
              <button className="edit" onClick={() => data.editModal(genre)}>
                Edit
              </button>
              <button
                className="delete"
                onClick={() => data.deleteModal(genre.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default Genres;
