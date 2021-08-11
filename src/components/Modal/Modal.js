import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { DataContext } from "../../contexts/Data";
import "./index.scss";

const Modal = ({
  handleRefresh,
  handleCloseModal,
  mode,
  editItem,
  deleteId,
}) => {
  const authors = useContext(DataContext).authors;
  const genres = useContext(DataContext).genres;
  const [newAuthors, setNewAuthors] = useState([]);
  const { register, handleSubmit } = useForm();
  const location = useLocation();
  const baseUrl = "http://localhost:8000";

  const onSubmit = (data) => {
    const id =
      mode === "create"
        ? ""
        : mode === "edit"
        ? "/" + editItem.id
        : "/" + deleteId;
    const url = `${baseUrl + location.pathname + id}`;
    const opts = {
      method: mode === "edit" ? "PUT" : mode === "delete" ? "DELETE" : "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: mode !== "delete" ? JSON.stringify(data) : null,
    };
    fetch(url, opts)
      .then((res) => {
        if (!res.ok) {
          throw Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        handleRefresh();
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        }
      });
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
        <div className={mode === "delete" ? "body delete" : "body"}>
          {mode === "delete" ? (
            <>
              <h1>Are you sure?</h1>
              <p>
                Do you really want to delete this record? This process cannot be
                undone.
              </p>
              <div>
                <button className="cancel" onClick={() => handleCloseModal()}>
                  Cancel
                </button>
                <button className="delete" onClick={() => onSubmit()}>
                  Delete
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="field">
                <input
                  {...register("name", {
                    required: true,
                    minLength: 3,
                    pattern: /[A-Za-z]/,
                  })}
                  defaultValue={editItem.name || ""}
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
                    {(mode === "edit" && editItem && (
                      <option disabled value="default">
                        {editItem.genre}
                      </option>
                    )) || (
                      <option disabled value="default">
                        Select Genre...
                      </option>
                    )}
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
                    {(mode === "edit" && editItem && (
                      <option disabled value="default">
                        {editItem.author}
                      </option>
                    )) || (
                      <option disabled value="default">
                        Select Author...
                      </option>
                    )}
                    {newAuthors &&
                      newAuthors.map((author) => (
                        <option key={author.id}>{author.name}</option>
                      ))}
                  </select>
                </div>
              )}
              <button type="submit">
                {mode === "edit" ? "Edit" : "Create"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
