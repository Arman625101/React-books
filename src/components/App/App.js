import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../utils/Routes";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import { useFetchForSelect } from "../../utils/useFetch";
import "./App.scss";

function App() {
  const [toRefresh, setToRefresh] = useState(false);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const { data } = useFetchForSelect(toRefresh);

  useEffect(() => {
    console.log("EFFECT", data);
    if (data) {
      setGenres(data.genres);
      setAuthors(data.authors);
    }
  }, [data, toRefresh]);

  const handleRefresh = () => {
    setToRefresh(true);
    setIsShowModal(false);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <button
            onClick={() => {
              setIsShowModal(true);
              setToRefresh(false);
              setMode("");
            }}
          >
            Add new
          </button>
          <Routes toRefresh={toRefresh} />
        </div>
      </div>
      {isShowModal && (
        <Modal
          authors={authors}
          genres={genres}
          handleRefresh={handleRefresh}
          mode={mode}
          handleCloseModal={() => setIsShowModal(false)}
        />
      )}
    </Router>
  );
}

export default App;
