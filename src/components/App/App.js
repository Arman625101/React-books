import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../../utils/Routes";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import { useFetch } from "../../utils/useFetch";
import { DataContext } from "../../contexts/Data";
import "./App.scss";

function App() {
  const [dataContext, setDataContext] = useState({});
  const [toRefresh, setToRefresh] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const [mode, setMode] = useState("");

  const { data } = useFetch(toRefresh);

  useEffect(() => {
    if (
      (Object.entries(data).length !== 0 && data.constructor === Object) ||
      toRefresh
    ) {
      setDataContext(data);
      setToRefresh(false);
    }
  }, [data, toRefresh]);

  const handleRefresh = () => {
    setToRefresh(true);
    setIsShowModal(false);
  };

  return (
    <DataContext.Provider value={dataContext}>
      <Router>
        <div className="App">
          <Navbar />
          <div className="content">
            <button
              onClick={() => {
                setIsShowModal(true);
                setMode("");
              }}
            >
              Add new
            </button>
            <Routes handleRefresh={handleRefresh} toRefresh={toRefresh} />
          </div>
        </div>
        {isShowModal && (
          <Modal
            handleRefresh={handleRefresh}
            mode={mode}
            handleCloseModal={() => setIsShowModal(false)}
          />
        )}
      </Router>
    </DataContext.Provider>
  );
}

export default App;
