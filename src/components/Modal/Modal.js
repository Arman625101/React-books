import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { usePost } from "../../utils/useFetch";
import { useForm } from "react-hook-form";
import { DataContext } from "../../contexts/Data";
import "./index.scss";

const Modal = ({ handleRefresh, handleCloseModal, mode }) => {
  const authors = useContext(DataContext).authors;
  const genres = useContext(DataContext).genres;
  const [result, setResult] = useState("");
  const [newAuthors, setNewAuthors] = useState([]);
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  usePost(location.pathname, result);

  const onSubmit = (data) => {
    setResult(JSON.stringify(data));
    handleRefresh();
  };
  const handleChange = (e) => {
    const newArr = authors.filter((el) => el.genre === e.target.value);
    setNewAuthors(newArr);
  };

  return (
    <div className="modal-holder">
      <div className="modal">
        <div className="header">
          <div className="close" onClick={() => handleCloseModal()}>
            <div className="close-inner">
              <div className="cl"></div>
            </div>
          </div>
        </div>
        <div className="body">
          {mode === "delete" ? (
            <p>Delete</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <input
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    pattern: /[A-Za-z]/,
                  })}
                  placeholder="Name"
                  required
                />
              </div>
              {location.pathname !== "/genres" && (
                <div className="field">
                  <select
                    defaultValue={"default"}
                    {...register("genre", {
                      required: true,
                    })}
                    onChange={handleChange}
                  >
                    <option disabled value="default">
                      Select Genre...
                    </option>
                    {genres &&
                      genres.map((genre) => (
                        <option key={genre.id}>{genre.name}</option>
                      ))}
                  </select>
                </div>
              )}
              {location.pathname === "/books" && (
                <div className="field">
                  <select
                    defaultValue={"default"}
                    {...register("author", {
                      required: true,
                    })}
                  >
                    <option disabled value="default">
                      Select Author...
                    </option>
                    {newAuthors &&
                      newAuthors.map((author) => (
                        <option key={author.id}>{author.name}</option>
                      ))}
                  </select>
                </div>
              )}
              <button type="submit">Create</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
